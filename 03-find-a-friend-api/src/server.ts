import { app } from '@/app'

const PORT = 3333
const HOST = '0.0.0.0'

app
  .listen({
    host: HOST,
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running on ${HOST}:${PORT}`)
  })