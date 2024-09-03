import express from 'express'
import connection from './config/db.js'
import userRouter from './routes/user.route.js'
import userAuth from "./middleware/userAuth.middleware.js"
import returnRouter from './routes/return.route.js'
import orderRouter from './routes/order.route.js'
import productRouter from './routes/product.route.js'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()



const server=express()
const PORT=process.env.PORT || 3000

server.use(express.json())
server.use('/user', userRouter)
server.use('/return', returnRouter)
server.use('/order', orderRouter)
server.use('/product', productRouter)
server.use(cors({
    origin:'*'
}))

server.get("/", (req, res)=>{
    res.send("server is getting fine")
})



server.listen(PORT, async(req, res)=>{
    try {
        await connection
        console.log(`Server is connected to the DB and running on port ${PORT} `)
        
    } catch (error) {
        console.log(`There is something error ${error}`)
    }
    
    
})