import { createApp } from './app.js'
import { env } from './config/env.js'

const app = createApp()

app.listen(env.port, () => {
  console.log(`NYCTA LMS API listening on http://localhost:${String(env.port)}`)
})
