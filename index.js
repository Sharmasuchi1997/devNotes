import express from 'express'
import connection from './config/db.js'
import userRouter from './routes/user.route.js'
import userAuth from "./middleware/userAuth.middleware.js"
import returnRouter from './routes/return.route.js'
import orderRouter from './routes/order.route.js'
import productRouter from './routes/product.route.js'
// import cartRouter from './routes/cart.route.js'
import sponsProductRouter from './routes/sponsProduct.route.js'
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
server.use('/sponsor', sponsProductRouter)
// server.use('/cart', cartRouter)
// server.use(cors({
//     origin:'*'
// }))

// const allowedOrigins= ["http://localhost:5175","https://devnotes-bb11.onrender.com"]
server.use(cors({
    origin: "*"
    
}));

// server.get('/sponsor/get-products', (req, res) => {
//     res.json({ message: 'CORS enabled!' });
// });


// const allowedOrigins= ["http://localhost:5173","https://devnotes-bb11.onrender.com"]
// server.use(cors({
//     origin:(origin,callback)=>{
//         console.log("Origin is", origin);
//         if(allowedOrigins.indexOf(origin)!==-1||!origin){
//             console.log("Origin allowed");
//             callback(null,true)
//         }
//         else{
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials:true
// }));

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