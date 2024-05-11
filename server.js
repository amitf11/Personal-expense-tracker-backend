import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'

import { authRoutes } from './api/auth/auth.routes.js'
import { expenseRoutes } from './api/expense/expense.routes.js'

const app = express()
const server = http.createServer(app)

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3030',
            'http://localhost:3030',
            'http://127.0.0.1:5173',
            'http://localhost:5173'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/expense', expenseRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


const port = process.env.PORT || 3030
server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})