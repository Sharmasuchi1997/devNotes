import express from 'express'
import userAuth from '../middleware/userAuth.middleware.js'
import ProductModel from '../models/product.model.js'
import checkAdmin from '../middleware/checkAdmin.middleware.js'


const orderRouter=express.Router()

orderRouter.get('/',[userAuth, checkAdmin], (req, res)=>{
    res.send('order Route is here')
})

// orderRouter.post('/placeOrder', )

orderRouter.post('/order-product', [userAuth, checkAdmin],async(req, res)=>{
    const {productName, amount, description, rating }=req.body
    try {
        const product=new ProductModel({
            productName, amount, description, rating
        })

        await product.save()
        res.status(201).json({
            'msg':'product creation successfull'
        })
    } catch (error) {
        res.status(404).send(`There is some error while order products ${error}`)
    }
})

orderRouter.patch('/update-products/:_id', async(req, res)=>{
  
    const{_id}=req.params
    try {
            const updateProducts=await ProductModel.findByIdAndUpdate({_id:_id})
        res.status(201).json({
            'msg':"product updation successfull",
            updateProducts
        })


    } catch (error) {
       res.status(404).send(`There is some error ${error}`) 
    }
})
export default orderRouter