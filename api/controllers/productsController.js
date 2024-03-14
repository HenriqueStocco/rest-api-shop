import mongoose from 'mongoose'
import { env } from 'node:process'
import productSchema from '../models/productSchema.js'

const host = env.HOST
const port = env.PORT

export function getAllProducts(req, res) {
  productSchema
    .find()
    .select('name price _id')
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: 'GET',
              url: `${host}:${port}/products/` + doc._id
            }
          }
        })
      }
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

export function postNewProduct(req, res) {
  const product = new productSchema({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })

  product
    .save()
    .then(result => {
      res.status(200).json({
        message: 'Created product successfully',
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: `${host}:${port}/products/` + result._id
          }
        }
      })
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

export function getProductId(req, res) {
  const id = req.params.productsID

  productSchema
    .findById(id)
    .select('_id')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: `${host}:${port}/products/` + doc._id
          }
        })
      } else {
        res.status(404).json({ message: 'No valid entry found for provider ID' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

export function updateOneProduct(req, res) {
  const id = req.params.productsID
  const updateOps = {}

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  productSchema.findByIdAndUpdate({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: `${host}:${port}/products/` + result._id
        }
      })
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

export function deleteProductById(req, res) {
  const id = req.params.productsID

  productSchema
    .deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted',
        request: {
          type: 'POST',
          url: `${host}:${port}/products/` + result._id,
          body: { name: 'String', price: 'Number' }
        }
      })
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}
