import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { addExpense, getExpenses } from './expense.controller.js'

const router = express.Router()

router.get('/', requireAuth, getExpenses)
router.post('/', addExpense)
// router.put('/:id', requireAuth, updateExpense)
// router.delete('/:id', requireAuth, removeExpense)

export const expenseRoutes = router