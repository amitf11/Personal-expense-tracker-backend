import { dbService } from "../../services/db.service.js"

export const expenseService = {
    query,
    add,
}

async function query() {
    try {
        const criteria = {}
        const collection = await dbService.getCollection('expense')
        const expenses = await collection.find(criteria).toArray()

        return expenses
    } catch (err) {
        throw err
    }
}

async function add(expense) {
    try {
        console.log('expense:', expense)
        const collection = await dbService.getCollection('expense')
        await collection.insertOne(expense)
        return expense
    } catch (err) {
        throw err
    }
}