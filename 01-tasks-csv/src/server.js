import { TaskController } from './controllers/task-controller.js'
import { App } from './lib/app.js'
import { json } from './middlewares/json.js'

const app = new App()

app.use(json)

app.get('/tasks', TaskController.listTasks)
app.post('/tasks', TaskController.addTask)
app.put('/tasks/:id', TaskController.updateTask)
app.delete('/tasks/:id', TaskController.deleteTask)
app.patch('/tasks/:id/complete', TaskController.markAsCompleted)

app.listen(3333)