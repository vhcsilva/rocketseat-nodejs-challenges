import { App } from './lib/app.js'
import { json } from './middlewares/json.js'

const app = new App()

app.use(json)

app.listen(3333)