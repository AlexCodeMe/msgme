import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.post('/send/:id', protectRoute, sendMessage)
router.get('/conversations', protectRoute, getUsersForSidebar)
router.get('/:id', protectRoute, getMessages)

export default router