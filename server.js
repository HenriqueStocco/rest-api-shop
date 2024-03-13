import http from 'http'
import { env } from 'process'
import { app } from './api/app.js'

const port = env.PORT
const host = env.HOST
const server = http.createServer(app)

server.listen(port, () => {
  console.log(`Server is running in ${host}:${port}`)
})
