import { Router } from 'express'
import {
  getAllProducts,getProductId,
  postNewProduct, updateOneProduct,
  deleteProductById
} from '../controllers/productsController.js'

const router = Router()

router.get('/', getAllProducts)
router.post('/', postNewProduct)
router.get('/:productsID', getProductId)
router.patch('/:productsID', updateOneProduct)
router.delete('/:productsID', deleteProductById)

export default router
