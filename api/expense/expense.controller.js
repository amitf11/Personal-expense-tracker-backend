import { userService } from "../user/user.service.js"
import { expenseService } from "./expense.service.js"


export async function getExpenses(req, res) {
    try {
        const { loggedinUser } = req
        const { filterBy, sortBy } = req.query.params
        const owner = await userService.getById(loggedinUser._id)
        if (!owner) res.status(400).send({ err: 'Failed to find owner' })
        const expenses = await expenseService.query(owner._id, filterBy, sortBy)
        res.json(expenses)
    } catch (err) {
        res.status(400).send({ err: 'Failed to get expenses' })
    }
}


export async function addExpense(req, res) {
    const { loggedinUser } = req
    const owner = await userService.getById(loggedinUser._id)
    try {
        const expense = req.body
        expense.owner = owner // TODO: Reference to owner
        expense.createdAt = Date.now()
        const addedExpense = await expenseService.add(expense)
        console.log('Expense succesfully added', expense)
        res.json(addedExpense)
    } catch (err) {
        console.log('err:', err)
        res.status(400).send({ err: 'Failed to add expense' })
    }
}

export async function updateExpense(req, res) {
    try {
        const expense = req.body
        const updatedExpense = await expenseService.update(expense) // TODO: validate expense owner - create gnerece validation
        res.json(updatedExpense)
    } catch (err) {
        res.status(400).send({ err: 'Failed to update expense' })
    }
}

export async function removeExpense(req, res) {
    try {
        const expenseId = req.params.id
        console.log('expenseId:', expenseId)
        const removedId = await expenseService.remove(expenseId) // TODO: Validation for ownership
        res.send(removedId)
    } catch (err) {
        console.log('Failed to remove expense', err)
        res.status(400).send({ err: 'Failed to remove expense' })
    }
}