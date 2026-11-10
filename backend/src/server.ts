import express from 'express'
import cors from 'cors'
import employeeRoutes from './routes/employeeRoutes'
import roleRoutes from './routes/roleRoutes'

const app = express()
const PORT = 3000
const FRONTEND_ORIGIN = 'http://localhost:5173'

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || origin === FRONTEND_ORIGIN) {
                callback(null, true)
                return
            }

            callback(new Error('Not allowed by CORS'))
        }
    })
)

app.use(express.json())

app.use('/api/employees', employeeRoutes)
app.use('/api/roles', roleRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})