const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const port = 5050 


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.fltsf.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    res.send('hello everyOne')
})

client.connect(err => {
  const collection = client.db("HotOnion").collection("product");
  
  app.post('/newProduct', (req, res) => {
      const newProduct = (req.body)
      collection.insertOne(newProduct)
      .then(result => {
          console.log('product added succesfully')
          console.log(result)
      })
  })
  
});

app.listen(port, () => console.log(`i am listening to port ${port}`))