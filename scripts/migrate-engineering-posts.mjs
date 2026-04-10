/**
 * Migrate Webflow "Engineerings" collection to Sanity contentPost documents.
 *
 * What this does:
 * 1. Uploads cover images from Webflow CDN to Sanity assets
 * 2. Uploads all inline images from the HTML body to Sanity assets
 * 3. Converts Webflow rich-text HTML → Sanity Portable Text (blockContent)
 * 4. Updates the existing "citations" post (cover image + full body)
 * 5. Creates the "agent-sandboxes" post as a draft
 *
 * Run:  node scripts/migrate-engineering-posts.mjs
 */

import { createClient } from '@sanity/client'
import { nanoid } from 'nanoid'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// ---------------------------------------------------------------------------
// Image upload helper
// ---------------------------------------------------------------------------

async function uploadImageFromUrl(url, filename) {
  console.log(`  Uploading image: ${filename || url.slice(-40)}`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image ${url}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') || 'image/png'
  const asset = await client.assets.upload('image', buffer, {
    filename: filename || url.split('/').pop().split('?')[0],
    contentType,
  })
  return asset._id
}

// ---------------------------------------------------------------------------
// HTML → Portable Text converter
// ---------------------------------------------------------------------------

function key() {
  return nanoid(12)
}

function htmlToPortableText(html) {
  const blocks = []
  // Track images we need to upload — replaced after conversion
  const imageQueue = [] // { blockIndex, url, alt, caption }

  // Split HTML into top-level elements
  const elements = splitTopLevel(html)

  let listLevel = 0

  for (const el of elements) {
    const tag = getTag(el)

    if (tag === 'h2' || tag === 'h3' || tag === 'h4') {
      blocks.push(makeTextBlock(stripTag(el), tag))
    } else if (tag === 'p') {
      const inner = stripTag(el).trim()
      if (!inner || inner === '‍' || inner === '\u200b') continue
      blocks.push(makeTextBlock(inner, 'normal'))
    } else if (tag === 'blockquote') {
      blocks.push(makeTextBlock(stripTag(el), 'blockquote'))
    } else if (tag === 'ul') {
      const items = extractListItems(el)
      for (const item of items) {
        blocks.push(makeTextBlock(item, 'normal', 'bullet', 1))
      }
    } else if (tag === 'ol') {
      const items = extractListItems(el)
      for (const item of items) {
        blocks.push(makeTextBlock(item, 'normal', 'number', 1))
      }
    } else if (tag === 'figure') {
      const imgMatch = el.match(/<img[^>]+src="([^"]+)"[^>]*>/i)
      const captionMatch = el.match(/<figcaption>(.*?)<\/figcaption>/is)
      if (imgMatch) {
        const imgUrl = imgMatch[1]
        const alt = el.match(/alt="([^"]*)"/i)?.[1] || ''
        const caption = captionMatch
          ? captionMatch[1].replace(/<[^>]+>/g, '').trim()
          : ''
        const idx = blocks.length
        // Placeholder — will be replaced after image upload
        blocks.push({
          _key: key(),
          _type: 'image',
          __pendingUrl: imgUrl,
          alt: alt === '__wf_reserved_inherit' ? '' : alt,
          caption,
        })
        imageQueue.push({ blockIndex: idx, url: imgUrl })
      }
    }
  }

  return { blocks, imageQueue }
}

function splitTopLevel(html) {
  // Remove wrapping divs that Webflow sometimes adds
  let h = html.trim()

  const elements = []
  // Match top-level tags: <p>, <h2>, <h3>, <h4>, <ul>, <ol>, <figure>, <blockquote>, <div>
  const regex =
    /<(p|h[1-6]|ul|ol|figure|blockquote|div|pre)(\s[^>]*)?>[\s\S]*?<\/\1>/gi
  let match
  while ((match = regex.exec(h)) !== null) {
    elements.push(match[0])
  }
  return elements
}

function getTag(el) {
  const m = el.match(/^<(\w+)/i)
  return m ? m[1].toLowerCase() : ''
}

function stripTag(el) {
  return el.replace(/^<[^>]+>/, '').replace(/<\/[^>]+>$/, '')
}

function extractListItems(el) {
  const items = []
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
  let m
  while ((m = liRegex.exec(el)) !== null) {
    items.push(m[1].trim())
  }
  return items
}

// Parse inline HTML into Sanity spans with marks
function makeTextBlock(html, style, listItem, level) {
  const spans = []
  const markDefs = []

  parseInline(html, [], spans, markDefs)

  const block = {
    _key: key(),
    _type: 'block',
    children: spans.length > 0 ? spans : [{ _key: key(), _type: 'span', marks: [], text: '' }],
    markDefs,
    style,
  }
  if (listItem) {
    block.listItem = listItem
    block.level = level || 1
  }
  return block
}

function parseInline(html, activeMarks, spans, markDefs) {
  let cursor = 0
  const tagRegex = /<(\/?)(\w+)([^>]*)>/g
  let m

  while ((m = tagRegex.exec(html)) !== null) {
    const [fullMatch, isClosing, tagName, attrs] = m
    const tag = tagName.toLowerCase()
    const before = html.slice(cursor, m.index)

    if (before) {
      const text = decodeEntities(before)
      if (text) {
        spans.push({ _key: key(), _type: 'span', marks: [...activeMarks], text })
      }
    }
    cursor = m.index + fullMatch.length

    if (!isClosing) {
      if (tag === 'strong' || tag === 'b') {
        activeMarks.push('strong')
      } else if (tag === 'em' || tag === 'i') {
        activeMarks.push('em')
      } else if (tag === 'code') {
        activeMarks.push('code')
      } else if (tag === 'a') {
        const href = attrs.match(/href="([^"]*)"/i)?.[1]
        if (href) {
          const linkKey = key()
          markDefs.push({
            _key: linkKey,
            _type: 'link',
            href,
            openInNewTab: true,
          })
          activeMarks.push(linkKey)
        }
      } else if (tag === 'br') {
        spans.push({ _key: key(), _type: 'span', marks: [...activeMarks], text: '\n' })
      }
      // skip img, figure, etc inside inline context
    } else {
      // Closing tag — pop the corresponding mark
      if (tag === 'strong' || tag === 'b') {
        popMark(activeMarks, 'strong')
      } else if (tag === 'em' || tag === 'i') {
        popMark(activeMarks, 'em')
      } else if (tag === 'code') {
        popMark(activeMarks, 'code')
      } else if (tag === 'a') {
        // Pop the link key (last non-decorator mark)
        const linkIdx = activeMarks.findLastIndex(
          (m) => m !== 'strong' && m !== 'em' && m !== 'code'
        )
        if (linkIdx >= 0) activeMarks.splice(linkIdx, 1)
      }
    }
  }

  // Remaining text after last tag
  const remaining = html.slice(cursor)
  if (remaining) {
    const text = decodeEntities(remaining)
    if (text) {
      spans.push({ _key: key(), _type: 'span', marks: [...activeMarks], text })
    }
  }
}

function popMark(marks, name) {
  const idx = marks.lastIndexOf(name)
  if (idx >= 0) marks.splice(idx, 1)
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\u200b/g, '')
    .replace(/‍/g, '')
}

// ---------------------------------------------------------------------------
// Post data (from Webflow CMS)
// ---------------------------------------------------------------------------

const CITATIONS_ID = '0b81ca12-ba02-4991-8ed5-c030e16c91ed'
const AUTHOR_THET_ID = 'author-thet-naing'

const citationsCoverImageUrl =
  'https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69b9c9221e13cc107c7b850e_citations%20that%20work.png'

const citationsBody = `<h2><strong>How We Built AI Citations That Actually Work</strong></h2><p>AI can produce finished deliverables in minutes. But nobody puts their name on work they haven't verified — and verifying every claim, against every source, is the actual bottleneck. Generation is cheap. Trust is expensive.</p><p>Most AI products treat citations as an afterthought: generate an answer, append a list of sources at the bottom. "Based on Document A, Document B, and Document C." The user reads the answer, sees the source list, and has no way to verify which claim came from which document — let alone which paragraph on which page. At that point, verification means re-reading the source documents yourself, which defeats the purpose of using AI in the first place.</p><p>For research and analysis professionals — investment analysts, consultants, anyone whose work product needs to be defensible — this gap determines whether AI is a real tool or an expensive toy. They don't want a list of sources. They want to click a claim, land on the exact sentence in the original document, and verify it with their own eyes in seconds.</p><p>Building that — citations that resolve to specific character ranges in text files, bounding boxes on PDF pages, cell ranges in spreadsheets, and XPath expressions in structured data — turned out to be one of the hardest and most rewarding engineering problems we've tackled at Brightwave.</p><figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" style="max-width:3162px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="3162px"><div><img src="https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69b9c99358e043754b763388_citations.png" loading="lazy" alt="Citations overview" width="auto" height="auto"></div></figure><h2>The Problem With Citations in AI Systems</h2><p>The standard RAG approach treats citations as a retrieval problem: find relevant chunks, pass them to the LLM, hope the LLM attributes correctly. This breaks down in several ways.</p><p><strong>The LLM makes claims that span multiple passages.</strong> An analyst asks "How has this company's revenue mix shifted?" The answer synthesizes data from page 12, page 47, and a footnote on page 93. A single "Source: Annual Report" citation is meaningless. You need per-claim attribution — this sentence comes from here, that number comes from there.</p><p><strong>Different document types need fundamentally different position metadata.</strong> A citation in a PDF needs page numbers and bounding box coordinates. A citation in a spreadsheet needs a sheet name and cell range. A citation in a JSON file needs a path expression. A citation in a plain text file needs character offsets. One schema doesn't fit all of these — but your agents, your database, and your frontend all need to work with all of them.</p><p><strong>Citations have to be verifiable at the point of use.</strong> A citation that says "Source: Q3 Earnings Report" is a reference, not a citation. A real citation takes you to the exact passage, on the exact page, highlighted so you can read the original language and judge the claim yourself. Anything less shifts the verification burden back to the user.</p><figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" style="max-width:2182px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="2182px"><div><img src="https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69b9c9cc20cbc7909370a355_chatgpt.png" loading="lazy" alt="ChatGPT sources comparison" width="auto" height="auto"></div><figcaption><em>Sources in ChatGPT</em></figcaption></figure><h2>One Click, Every Format</h2><p>The real complexity is in making citations <em>resolve</em> — taking an evidence record and turning it into a highlighted passage the user can see. Each document format requires its own approach.</p><h3>Text and Markdown: Character Ranges</h3><p>For plain text and markdown documents, evidence carries absolute character indices into the raw file — <code>start_char_index</code> and <code>end_char_index</code>. When a user clicks a citation, the frontend:</p><ol><li>Figures out which chunk of the progressively-rendered document contains those offsets</li><li>Transforms the raw character indices through the rendering pipeline (our markdown renderer adds spacing transformations that shift positions)</li><li>Walks the rendered HTML's AST to find the text nodes that overlap the range</li><li>Wraps them in <code>&lt;mark&gt;</code> tags</li><li>Scrolls the highlight into view</li></ol><p>The tricky part is step 2. Between the raw file and what the user sees, the text passes through Unicode decoding, LaTeX escaping, and line break preservation — each of which can shift character positions. The frontend maintains offset transformation functions that map from "position in raw file" to "position in rendered output." Get this wrong by even one character, and the highlight lands on the wrong sentence.</p><figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" style="max-width:1464px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="1464px"><div><img src="https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69b9cf453e736cf86bf3fc34_txt%201%20click%20_small.gif" loading="lazy" alt="Text citation click demo" width="auto" height="auto"></div></figure><h3>Rich Documents: Bounding Boxes</h3><p>Rich documents (PDFs, Word documents, Powerpoint presentations) don't have character positions in any meaningful sense — they're collections of positioned glyphs on a page. Our document processing pipeline extracts text with bounding box coordinates (normalized 0-1 relative to page dimensions) during ingestion.</p><p>Evidence for rich content carries a list of bounding box objects, each with a page number and coordinates. The frontend renders these as semi-transparent overlays positioned absolutely within the page.</p><p>When evidence spans multiple pages, the UI shows a "continues on next page" indicator. Clicking it navigates to the next page and scrolls to the continuation.</p><figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" style="max-width:1452px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="1452px"><div><img src="https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69b9cff1967bcd6ee57d83fb_pdf%201%20click.gif" loading="lazy" alt="PDF citation click demo" width="auto" height="auto"></div></figure><h3>Spreadsheets: Cell Ranges</h3><p>Spreadsheet evidence stores sheet name, sheet index, and A1-notation cell ranges (<code>B2:D15</code>). The agent reads actual cell values when creating evidence and maps them to specific cell ranges within the workbook — so clicking a citation navigates directly to the right sheet and highlights the exact cells.</p><p>On click, the frontend activates the correct sheet tab, parses the A1 notation into row/column indices, applies a highlight class to matching cells in the grid, and scrolls the viewport to center on the range.</p><figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" style="max-width:1452px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="1452px"><div><img src="https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69b9cfb0c721329b8b75d17a_excel%201%20click.gif" loading="lazy" alt="Excel citation click demo" width="auto" height="auto"></div></figure><h3>Structured Data: Path Expressions</h3><p>JSON and XML documents get path-based citations. For JSON, we use dot-notation paths (e.g., <code>items.0.invoice_number</code>). For XML, we use XPath expressions (e.g., <code>//invoice/items/item[1]/price</code>).</p><p>The evidence text is the serialized value at that path — the actual data the agent is citing. The frontend uses the path expression to navigate a tree viewer to the cited node and highlight it.</p><figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" style="max-width:1452px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="1452px"><div><img src="https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69b9d05560d576cb327c0fc3_json.gif" loading="lazy" alt="JSON citation demo" width="auto" height="auto"></div></figure><h2>How Agents Create Citations</h2><p>Citations don't happen by accident — they're built into the system from the ground up, starting at document processing time.</p><p>When we ingest a document, we don't just extract text. We attach the specific position metadata each format needs to the retrieval layer: character ranges for text, bounding boxes for PDFs and rich documents, cell addresses for spreadsheets, path expressions for structured data. This means that when an agent later reads a passage, the position information is already there — carried through from ingestion to retrieval to the agent's context.</p><p>When the agent writes its response, it embeds custom inline citation directives that flow naturally with the generated content:</p><p><code>The company's revenue grew 15% year-over-year :cit[reaching $115M in Q4]{evidence_id=abc123}</code></p><p>A parsing step strips these directives from the user-visible text, extracts the citation metadata, and creates citation records linking evidence to specific positions in the response. The user sees clean prose with small citation indicators. Click one, and you're looking at the source.</p><figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" style="max-width:2224px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="2224px"><div><img src="https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69b9d65d571f10f5f954d76d_citations-pipeline-flow.png" loading="lazy" alt="Citations pipeline flow" width="auto" height="auto"></div></figure><p>None of this matters if the citations are wrong. Whether evidence comes from retrieval or is created by an agent, every citation goes through quality control before it reaches the user. Rule-based validation checks structural correctness: are the character offsets within bounds, does the cell range reference a real sheet, does the XPath resolve to an existing node. LLM-based validation checks the harder question: does the cited passage actually support the claim being made in the generated content? A citation that's structurally valid but points to a passage that doesn't back the claim is worse than no citation at all, because it looks trustworthy. Both layers have to pass before a citation is considered valid.</p><h2>Evaluating and Monitoring Citation Quality</h2><p>Building a citation system is one problem. Knowing whether it actually works — across thousands of documents, dozens of formats, and millions of claims — is another. Citations that are right 95% of the time aren't good enough. That remaining 5% is exactly the kind of error that erodes trust.</p><p>We don't just test citations before shipping — we continuously evaluate them against real citations created by real users in production. This is the only way to catch the failure modes that matter: the ones that happen at scale, with messy real-world documents, under conditions no benchmark perfectly replicates.</p><p><strong>Exhaustive benchmarking and continuous evaluation</strong> over production data. We test citation accuracy across document types, sizes, and complexity levels before shipping — and then keep testing against real citations created by real users in production. An LLM-as-judge pipeline reviews citation-claim pairs, checking whether the evidence actually supports the claim, whether substantive claims are properly cited, and whether the cited passage is minimal and specific rather than an entire page when a sentence would do. These evals run continuously as our processing pipelines and agent prompts evolve.</p><p><strong>Operational monitoring</strong> tracks citation health the same way we track uptime. Resolution failure rates catch regressions in the processing pipeline. Citation density tracking catches agent prompt drift — sudden drops suggest tool call failures, sudden spikes suggest over-citation. We track success rates independently per document format so a regression in, say, PDF bounding boxes doesn't hide behind high text citation accuracy.</p><p>Every class of production failure becomes a new test case, so regressions don't recur. This loop — production monitoring → new evals → benchmarks → deploy — is how citation quality improves monotonically rather than oscillating with each change.</p><figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" style="max-width:2420px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="2420px"><div><img src="https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69ba35534f716ce85b8762fc_image%20(3).png" loading="lazy" alt="Citation quality analytics dashboard" width="auto" height="auto"></div><figcaption><em>One of our internal Citation Quality Analytics dashboards, tracking aggregate citation quality across nearly a million evaluations in production over the last 30 days. Scores continue to trend upward as our processing pipelines and agent prompts improve.</em></figcaption></figure><h2>What We Learned</h2><p><strong>Citations are a systems problem, not an LLM problem.</strong> The LLM's job is to identify what to cite. Everything else — position metadata, cross-format resolution, offset transformations, pixel-perfect highlighting, validation — is engineering. Most of the complexity lives outside the model.</p><p><strong>Different document types need different citation UX, not just different metadata.</strong> Early on, we tried to unify everything into "highlighted text in a viewer." It doesn't work. A cell range in a spreadsheet needs grid-level highlighting with sheet navigation. A JSON path needs tree expansion. A PDF needs bounding box overlays. The evidence schema is polymorphic (discriminated union on evidence type), and the frontend has separate rendering paths for each. This is one of those cases where the abstraction is in the data model, not the UI.</p><p><strong>You have to measure citation quality as rigorously as you measure model quality.</strong> It's tempting to treat citations as a UI feature — either they work or they don't. In practice, citation quality exists on a spectrum, and it degrades silently. A processing pipeline change shifts character offsets. A prompt tweak makes the agent cite less frequently. Without continuous measurement over real user data, you don't notice until users start complaining. By then, trust is already damaged.</p><p><strong>The gap between "has citations" and "citations you can trust" is enormous.</strong> Appending source links is a weekend project. Building citations that resolve to exact positions across multiple document formats, survive validation at every layer, and render correctly in a viewer that progressively loads large files — that's months of engineering. It's also the difference between an AI tool that generates faster and one that lets professionals <em>work</em> faster. Those aren't the same thing.</p><p>Every shortcut in the citation system — every "Source: Document A" that should have been a highlighted passage on page 47 — is a moment where the user has to slow down and do the verification work themselves.</p><p>Building citations that actually work — not just citations that exist, but citations that take you to the exact place in the exact document and highlight the exact passage — is how you close that gap. It's how you turn AI from "interesting but I still have to check everything" into a tool that makes professionals genuinely faster at the work that matters.</p>`

const agentSandboxesBody = `<p>This is the first post in "From Chatbot to Operating System" — a three-part series on how we're building agents that don't just answer questions, but do real work autonomously.</p><p>Most AI agent frameworks give their agents a toolbox: a list of functions the model can call, each one a narrow capability bolted onto a chat loop. Read a file. Search the web. Run a SQL query. The agent reasons about which tool to call next, calls it, reads the result, reasons again. Every capability is a round-trip through the LLM.</p><p>This works — until it doesn't. The more tools you add, the more tokens the model spends reasoning about which one to pick. But that's just the runtime cost. The engineering cost is worse: every tool needs a function definition, a handler, a result schema, prompt guidance, and tests. When the tool's behavior changes, every prompt that references it needs updating. The registry becomes a maintenance surface that grows with every capability you add — and the context window bloat grows with it.</p><p>Meanwhile, state-of-the-art models are remarkably good at writing and executing code. Give them bash, curl, and a Python runtime and they can accomplish more — faster and more flexibly — than any bespoke tool registry. The tools don't need to be specialized. They need to be general and powerful. And when the agent needs to understand an API, autogenerated docs work better than hand-maintained tool definitions that drift out of sync.</p><p>We still use native tool-calling agents at Brightwave — they're the right choice for many tasks. But for complex, multi-step work that requires real computation, we took a different approach. Those agents get their own machines.</p><h2>What "Its Own Machine" Actually Means</h2><p>When you start a research task in Brightwave, we don't spin up a chat loop with a list of tools. We provision a dedicated Kubernetes pod — an isolated computing environment with its own filesystem, its own code execution runtime, and its own network access. The agent binary running inside is a Rust process that manages its own conversation loop, executes code directly, and communicates with the platform through an event-driven protocol.</p><p>Each pod runs on the gVisor container runtime — the same kernel-level sandboxing technology Google Cloud uses for untrusted workloads. This isn't just container isolation. gVisor intercepts system calls at the kernel level, running them against a user-space kernel implementation. The agent's code can't escape the sandbox, can't access the host filesystem, and can't reach other sandboxes on the same node.</p><p>Inside that sandbox, the agent has a full workspace. This is a real computing environment. The agent can write Python scripts and execute them, install packages, download data from the web, generate Excel workbooks with real formulas, render charts, build PowerPoint presentations, and write Word documents. These aren't "tool calls" that go through the LLM — they're code running in the agent's own sandbox, with the full power of a real machine.</p><h2>The Lifecycle of a Sandbox Agent</h2><h3>Creation (~2 seconds)</h3><p>When a parent conversation spawns an agent, the platform selects the appropriate LLM model for the task, requests a new sandbox from the sandbox-router (a Rust service that manages pod lifecycle through a custom Kubernetes resource), provisions a dedicated pod with the agent binary already baked into the image — no compilation, no cold start — and starts the agent's HTTP server on port 8888.</p><h3>Initialization (~500ms)</h3><p>The parent sends an <code>/init</code> request containing the task description, document references, API keys, and connected app credentials. The agent creates its workspace directory structure, downloads source documents in parallel from S3 (via time-limited presigned URLs — no long-lived credentials in the sandbox), writes manifests cataloging available documents and templates, and initializes its state file, conversation log, and event stream.</p><figure class="w-richtext-figure-type-image w-richtext-align-fullwidth" style="max-width:1982px" data-rt-type="image" data-rt-align="fullwidth" data-rt-max-width="1982px"><div><img src="https://cdn.prod.website-files.com/6703d388a4ee8baaaceb02e1/69bdd561f542c403723cbd8e_m1.png" loading="lazy" alt="Agent lifecycle"></div><figcaption>Agent lifecycle</figcaption></figure>`

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('=== Engineering Log Migration ===\n')

  // ---- 1. Update citations post ----
  console.log('1. Updating "citations" post...')

  // Upload cover image
  console.log('  Uploading cover image...')
  const citationsCoverAssetId = await uploadImageFromUrl(
    citationsCoverImageUrl,
    'citations-that-work.png'
  )
  console.log(`  Cover image asset: ${citationsCoverAssetId}`)

  // Convert body HTML to Portable Text
  console.log('  Converting body HTML to Portable Text...')
  const { blocks: citationsBlocks, imageQueue: citationsImages } =
    htmlToPortableText(citationsBody)

  // Upload inline images
  for (const img of citationsImages) {
    const assetId = await uploadImageFromUrl(img.url, img.url.split('/').pop())
    const block = citationsBlocks[img.blockIndex]
    block.asset = { _type: 'reference', _ref: assetId }
    delete block.__pendingUrl
  }

  // Skip the first block if it's just the title repeated as H2
  let citationsFinalBlocks = citationsBlocks
  if (
    citationsBlocks[0]?.style === 'h2' &&
    citationsBlocks[0]?.children?.[0]?.text?.includes('How We Built AI Citations')
  ) {
    citationsFinalBlocks = citationsBlocks.slice(1)
  }

  // Patch the document
  await client
    .patch(CITATIONS_ID)
    .set({
      coverImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: citationsCoverAssetId },
      },
      body: citationsFinalBlocks,
      seo: {
        _type: 'seo',
        metaTitle: 'How We Built AI Citations That Actually Work | Brightwave',
        metaDescription:
          "Brightwave's AI research platform links every insight directly to its source. Here's how we built a citation system that makes AI-generated analysis verifiable and trustworthy for private markets analysts.",
      },
    })
    .commit()

  console.log('  ✓ Citations post updated\n')

  // ---- 2. Create agent-sandboxes post ----
  console.log('2. Creating "agent-sandboxes" post (draft)...')

  // Convert body HTML
  console.log('  Converting body HTML to Portable Text...')
  const { blocks: sandboxBlocks, imageQueue: sandboxImages } =
    htmlToPortableText(agentSandboxesBody)

  // Upload inline images
  for (const img of sandboxImages) {
    const assetId = await uploadImageFromUrl(img.url, img.url.split('/').pop())
    const block = sandboxBlocks[img.blockIndex]
    block.asset = { _type: 'reference', _ref: assetId }
    delete block.__pendingUrl
  }

  // Create as draft
  const doc = await client.create({
    _type: 'contentPost',
    title: 'From Chatbot to Operating System: Every Agent Gets Its Own Machine',
    slug: { _type: 'slug', current: 'agent-sandboxes' },
    category: 'engineering-log',
    publishedAt: '2026-03-20T00:00:00.000Z',
    author: { _type: 'reference', _ref: AUTHOR_THET_ID },
    excerpt:
      'How Brightwave gives every agent its own sandboxed Kubernetes pod — with a real filesystem, code execution runtime, and snapshot/resume — so agents can do real work, not just call tools.',
    body: sandboxBlocks,
    seo: {
      _type: 'seo',
      metaTitle: 'Every Agent Gets Its Own Machine | Brightwave',
      metaDescription:
        'How Brightwave provisions a dedicated Kubernetes pod for every agent — with gVisor sandboxing, a full code execution runtime, and snapshot/resume — so agents can do real work, not just call tools.',
    },
  })

  console.log(`  ✓ Agent sandboxes post created (draft): ${doc._id}\n`)

  console.log('=== Migration complete ===')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
