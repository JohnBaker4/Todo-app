import express from 'express'
import cors from 'cors'
import todoRouter from './routes/todoRouter.js'
import userRouter from './routes/userRouter.js'

const port = process.env.port

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', todoRouter)
app.use('/user', userRouter)

app.listen(port, () => {
 console.log(`Everything is fine and dandy over at http://localhost:${port}`)
}) 

app.use((err,req,res,next) => {
 const statusCode = err.status || 500
 res.status(statusCode).json({
 error: {
 message: err.message,
 status: statusCode
 }
 })
})

