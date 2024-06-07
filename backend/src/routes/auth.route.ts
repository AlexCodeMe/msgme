import express from 'express'
import { getMe, login, logout, register } from '../controllers/auth.controller.js'
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router()

router.get('/me', protectRoute, getMe)
router.post('/login', login)
router.post('/logout', logout)
router.post('/register', register)

export default router