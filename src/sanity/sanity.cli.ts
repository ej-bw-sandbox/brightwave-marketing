import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'v4tc8ohn',
    dataset: 'production',
  },
  deployment: {
    appId: 'rd2jp6dd41twu57lc3fgwkly',
    autoUpdates: true
  }
})

