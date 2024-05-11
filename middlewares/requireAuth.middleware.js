import { config } from '../config/index.js'
import { logger } from '../services/logger.service.js'
import { asyncLocalStorage } from '../services/als.service.js'

export async function requireAuth(req, res, next) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        req.loggedinUser = loggedinUser

        if (config.isGuestMode && !loggedinUser) {
            req.loggedinUser = { _id: '', fullname: 'Guest' }
            return next()
        }

        if (!loggedinUser) {
            return res.status(401).send('Not Authenticated')
        }

        next()
    } catch (error) {
        console.error('Error in requireAuth:', error)
        res.status(500).send('Internal Server Error')
    }
}
