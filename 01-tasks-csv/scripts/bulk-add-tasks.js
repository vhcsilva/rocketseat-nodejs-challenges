import fs from 'node:fs'
import { parse } from 'csv-parse'

const filePath = new URL('../assets/tasks.csv', import.meta.url)

const processFile = async () => {
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({ columns: true }))
  
  for await (const record of parser) {
    await fetch('http://localhost:3333/tasks', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(record),
    })
      .then(response => {
        return response.text()
      })
      .then(data => {
        console.log(data)
      })
  }
}

(async () => {
  await processFile()
})()