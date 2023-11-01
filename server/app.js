const express = require('express')
const cors = require('cors')

const logger = require('./logger')
const groceries = require('./groceries.json')

const app = express() //create server

//MIDLEWARE
app.use(cors())
app.use(logger)
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello Reddy!')
})

app.get('/grocery_list', (req, res) => {
    res.send(groceries)
})

app.get('/grocery_list/:id', (req, res) => {
    const idx = req.params.id - 1
  
    const item = groceries[idx]
  
    if (!item) {
      res.status(404).send({ error: "grocery item not found" })
    } else {
      res.status(200).send(item)
    }
  })



app.post('/grocery_list', (req, res) => {
  console.log("server / line 38")
  const item = req.body
  const lastItem = groceries[groceries.length - 1]

  const lastID = lastItem ? lastItem.id + 1 : 1
  item.id = lastID

  groceries.push(item)
  res.status(201).send(item)
})

app.patch('/grocery_list/:id', (req, res) => {

})

app.delete('/grocery_list/:id', (req, res) => {
  
})

module.exports = app;
