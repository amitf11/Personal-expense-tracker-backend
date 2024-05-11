import { expenseService } from "./expense.service.js"


export async function getExpenses(req, res) {
    try {
        const expenses = await expenseService.query()
        res.json(expenses)
    } catch (err) {
        res.status(400).send({ err: 'Failed to get expenses' })
    }
}


export async function addExpense(req, res) {
    // const { loggedinUser } = req
    // const owner = await userService.getById(loggedinUser._id)
    try {
        const expense = req.body
        // expense.owner = owner
        // expense.owner.rate = expense.owner.rate || 0
        const addedExpense = await expenseService.add(expense)
        console.log('Expense succesfully added', expense)
        res.json(addedExpense)
    } catch (err) {
        console.log('err:', err)
        res.status(400).send({ err: 'Failed to add expense' })
    }
}