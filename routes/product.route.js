import express from 'express'
import userAuth from '../middleware/userAuth.middleware.js'
import checkAdmin from '../middleware/checkAdmin.middleware.js'

const productRouter=express.Router()

productRouter.get('/', [userAuth, checkAdmin],(req, res)=>{
        res.send('product Router is here')
})

export default productRouter