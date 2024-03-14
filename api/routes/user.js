import { Router } from 'express'
import { createUser, deleteUser } from '../controllers/signupController.js'

const router = Router()

router.post('/signup', createUser)
router.delete('/:userId', deleteUser)

export default router
