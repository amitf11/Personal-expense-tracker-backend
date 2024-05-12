import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { addExpense, getExpenses, removeExpense, updateExpense } from './expense.controller.js'

const router = express.Router()

router.get('/', requireAuth, getExpenses)
router.post('/', requireAuth, addExpense)
router.put('/:id', requireAuth, updateExpense)
router.delete('/:id', requireAuth, removeExpense)

export const expenseRoutes = router