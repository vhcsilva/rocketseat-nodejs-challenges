import { randomUUID } from 'node:crypto'
import { HttpBadRequestError, HttpNotFoundError } from '../protocols/http-errors.js'
import { lowerCaseIncludes } from '../utils/string.js'

const tasks = []

async function listTasks(req, res) {
  const { title, description } = req.query
  
  const list = !!title || !!description ? 
    tasks.filter(task => lowerCaseIncludes(task.title, title) || lowerCaseIncludes(task.description, description)) : tasks

  return res.end(JSON.stringify(list))
}

async function addTask(req, res) {
  const { title, description } = req.body

  if (!title)
    throw new HttpBadRequestError('Missing title')

  if (!description)
    throw new HttpBadRequestError('Missing description')

  const newTask = {
    id: randomUUID(),
    title,
    description,
    created_at: new Date(),
    updated_at: new Date(),
    completed_at: null,
  }

  tasks.push(newTask)

  return res.writeHead(201).end(JSON.stringify(newTask))
}

async function updateTask(req, res) {
  const { id } = req.params
  const { title, description } = req.body

  if (!title && !description)
    throw new HttpBadRequestError('Missing parameters')

  const task = tasks.find(task => task.id === id)

  if (!task)
    throw new HttpNotFoundError('Task not found')

  if (title)
    task.title = title
  else if (description)
    task.description = description

  return res.writeHead(200).end()
}

async function deleteTask(req, res) {
  const { id } = req.params

  const taskIndex = tasks.findIndex(task => task.id === id)

  if (taskIndex <= -1)
    throw new HttpNotFoundError('Task not found')

  tasks.splice(taskIndex, 1)

  return res.end()
}

async function markAsCompleted(req, res) {
  const { id } = req.params

  const task = tasks.find(task => task.id === id)

  if (!task)
    throw new HttpNotFoundError('Task not found')

  task.completed_at = new Date()

  return res.writeHead(200).end()
}

export const TaskController = {
  listTasks,
  addTask,
  updateTask,
  deleteTask,
  markAsCompleted,
}