import Script from 'next/script'
import { Header } from '@/components/layout/header-wrapper'
import { Footer } from '@/components/layout/footer'

export default async function AbmLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false,
            });
          `,
        }}
      />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
