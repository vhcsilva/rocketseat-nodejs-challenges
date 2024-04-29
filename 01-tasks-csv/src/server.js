import { TaskController } from './controllers/task-controller.js'
import { JsonDatabase } from './database/json-database.js'
import { App } from './lib/app.js'
import { json } from './middlewares/json.js'

const app = new App()

const database = new JsonDatabase()
const taskController = new TaskController(database)

app.use(json)

app.get('/tasks', taskController.list.bind(taskController))
app.post('/tasks', taskController.add.bind(taskController))
app.put('/tasks/:id', taskController.update.bind(taskController))
app.delete('/tasks/:id', taskController.delete.bind(taskController))
app.patch('/tasks/:id/complete', taskController.markAsCompleted.bind(taskController))

app.listen(3333)