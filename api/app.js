import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import process from 'node:process'
import productsRoutes from './routes/products.js'
import ordersRoutes from './routes/orders.js'

const app = express()

// URL connection
const url_db_conn = process.env.MONGO_DB_CONNECTION_URL

// DB connection
mongoose.connect(url_db_conn)

// Logger for each server request
// Help me at debug
app.use(morgan('dev'))

// middleware parse the body of an incoming HTTP request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)

//
app.use((req, res, next) => {
  res
    .header('Access-Control-Allow-Origin', '*')
    .header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    )

  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET'
    )
    return res.status(200).json({})
  }
  next()
})

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status(404)
  next(error)
})

app.use((error, req, res) => {
  res
    .status(error.status || 500)
    .json({
      error: {
        message: error.message
      }
    })
})

export { app }
