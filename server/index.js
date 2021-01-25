const express = require('express')
const cors = require('cors')

const {getProducts, editProduct} = require('./models/product')


//initial express
const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())

app.get('/api/getProducts', async (_, res) => {
  const products = await getProducts()
  return res.status(200).json(products)
  
})

app.post('/api/editProduct', async (req, res) => {
  const {id, count, price} = req.body
  const products = await editProduct(id, price, count)
  return res.status(200).json(products)  
})


app.listen(PORT, () => console.log(`server is running on ${PORT} port`))
