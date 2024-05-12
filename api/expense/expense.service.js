import { dbService } from "../../services/db.service.js"

export const expenseService = {
    query,
    add,
    update,
    remove
}

async function query(userId, filterBy = { description: '' }, sort = { by: 'createdAt', asc: false }) {
    if (!userId) return res.status(400).send({ err: 'Failed to get expenses' })

    try {
        const criteria = {
            'owner._id': userId
        }

        const collection = await dbService.getCollection('expense')
        const expenses = await collection.find(criteria).toArray()

        return expenses
    } catch (err) {
        throw err
    }
}

async function add(expense) {
    try {
        const collection = await dbService.getCollection('expense')
        await collection.insertOne(expense)
        return expense
    } catch (err) {
        throw err
    }
}

async function update(expense) {
    try {
        const expenseToSave = {
            description: expense.description,
            category: expense.category,
            amount: expense.amount,
            createdAt: expense.createdAt,
        }

        const collection = await dbService.getCollection('expense')
        await collection.updateOne({ _id: new ObjectId(expense._id) }, { $set: expenseToSave })
        return expense
    } catch (err) {
        console.log(`cannot update expense ${expenseId}`, err)
        throw err
    }
}

async function remove(expenseId) {
    try {
        const collection = await dbService.getCollection('expense')
        await collection.deleteOne({ _id: new ObjectId(expenseId) })
        return expenseId
    } catch (err) {
        console.log(`cannot remove expense ${expenseId}`, err)
        throw err
    }
}