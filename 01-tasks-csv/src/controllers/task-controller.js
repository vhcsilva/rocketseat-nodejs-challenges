import { randomUUID } from 'node:crypto'
import { HttpBadRequestError, HttpNotFoundError } from '../protocols/http-errors.js'

export class TaskController {
  #table = 'tasks'
  #database

  constructor(database) {
    this.#database = database
  }

  async list(req, res) {
    const { title, description } = req.query

    const search = !!title || !!description ? { title, description } : null
    const tasks = this.#database.select(this.#table, search)
  
    return res.end(JSON.stringify(tasks))
  }

  async add(req, res) {
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
  
    this.#database.insert(this.#table, newTask)
  
    return res.writeHead(201).end(JSON.stringify(newTask))
  }
  
  async update(req, res) {
    const { id } = req.params
    const { title, description } = req.body
  
    if (!title && !description)
      throw new HttpBadRequestError('Missing parameters')
  
    if (!this.#database.select(this.#table, { id }))
      throw new HttpNotFoundError('Task not found')
  
    if (title)
      this.#database.update(this.#table, id, { title })
    else if (description)
      this.#database.update(this.#table, id, { description })
  
    return res.writeHead(200).end()
  }
  
  async delete(req, res) {
    const { id } = req.params
  
    if (!this.#database.select(this.#table, { id }))
      throw new HttpNotFoundError('Task not found')
  
    this.#database.delete(this.#table, id)
  
    return res.end()
  }
  
  async markAsCompleted(req, res) {
    const { id } = req.params
  
    if (!this.#database.select(this.#table, { id }))
      throw new HttpNotFoundError('Task not found')
  
    this.#database.update(this.#table, id, { completed_at: new Date() })
  
    return res.writeHead(200).end()
  }
}