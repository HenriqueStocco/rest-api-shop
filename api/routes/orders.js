import { Router } from 'express'
import {
  getOrders, getOrderId,
  postNewOrder, deleteOrder
} from '../controllers/ordersController.js'

const router = Router()

router.get('/', getOrders)
router.post('/', postNewOrder)
router.get('/:ordersID', getOrderId)
router.delete('/:ordersID', deleteOrder)

export default router
