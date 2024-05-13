import { ObjectId } from "mongodb"
import { dbService } from "../../services/db.service.js"

export const expenseService = {
    query,
    add,
    update,
    remove
}

async function query(userId, filterBy = { description: '', minAmount: 0, maxAmount: Infinity }, sortBy = { by: 'createdAt', asc: true }) {
    if (!userId) return res.status(400).send({ err: 'Failed to get expenses' })
    
    filterBy.minAmount = +filterBy.minAmount
    filterBy.maxAmount = +filterBy.maxAmount

    filterBy.startDate = +filterBy.startDate
    filterBy.endDate = +filterBy.endDate


    try {
        const criteria = {
            'owner._id': userId
        }

        if (filterBy.description) {
            criteria.description = { $regex: filterBy.description, $options: 'i' }
        }

        if (filterBy.category) {
            criteria.category = filterBy.category
        }

        if (filterBy.minAmount) {
            criteria.amount = { $gte: filterBy.minAmount }
        }

        if (filterBy.maxAmount) {
            criteria.amount = { $lte: filterBy.maxAmount }
        }

        if (filterBy.startDate) {
            criteria.createdAt = { $gte: filterBy.startDate }
        }

        if (filterBy.endDate) {
            criteria.createdAt = { $lte: filterBy.endDate }
        }
        

        const collection = await dbService.getCollection('expense')
        const expenses = await collection.find(criteria).toArray()

        if (sortBy.by === 'amount') {
            expenses.sort((a, b) => (JSON.parse(sortBy.asc) ? a.amount - b.amount : b.amount - a.amount));
        } else if (sortBy.by === 'createdAt') {
            expenses.sort((a, b) => (JSON.parse(sortBy.asc) ? b.createdAt - a.createdAt : a.createdAt - b.createdAt));
        }
        
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
        console.log(`cannot update expense ${expense._id}`, err)
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