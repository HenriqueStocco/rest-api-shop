import mongoose from 'mongoose'
import productSchema  from '../models/products.js'

export function getAllProducts (req, res) {
  productSchema
    .find().then(docs => {
      res.status(200).json(docs)
    }).catch(err => {
      res.status(500).json({ error: err})
    })
}

export function postNewProduct (req, res) {
  const product = new productSchema({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })

  product.save().then(result => {
    res.status.json({
      message: 'Handling POST requests to /products',
      createdProduct: result
    })
  }).catch(err => {
    res.status(500).json({ error: err })
  })
}

export function getProductId (req, res) {
  const id = req.params.productID

  productSchema.findById(id)
    .exec().then(doc => {
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: 'No valid entry found for provider ID'})
      }
    }).catch(err => {
      res.status(500).json({ error: err })
    })
}

export function updateOneProduct (req, res) {
  const id = req.params.productsID
  const updateOps = {}

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  productSchema.findByIdAndUpdate({ _id: id }, { $set: updateOps})
    .exec().then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(500).json({ error: err })
    })
}

export function deleteProductById (req, res) {
  const id = req.params.productsID

  productSchema
    .deleteOne({ _id: id }).exec().then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(500).json({ error: err })
    })
}

// export {
//   getAllProducts,
//   getProductId,
//   postNewProduct,
//   updateOneProduct,
//   deleteProductById
// }
