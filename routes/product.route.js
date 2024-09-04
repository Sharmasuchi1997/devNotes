import express from 'express'
import userAuth from '../middleware/userAuth.middleware.js'
import checkAdmin from '../middleware/checkAdmin.middleware.js'
import ProductModel from '../models/product.model.js'

const productRouter = express.Router()

productRouter.get('/', (req, res) => {
        res.send('product Router is here')
})

productRouter.post('/postProducts',[userAuth],async (req, res) => {
        const { productName, amount, description, rating } = req.body
        try {
                const createProduct = new ProductModel({
                        productName,
                        amount,
                        description,
                        rating
                })
                await createProduct.save()
                res.status(200).json({
                        'msg': "product creation is successfull",
                        // createProduct
                })
        } catch (error) {
                res.status(404).send(`There is something error ${error}`)
        }

})

// productRouter.patch('/update/:_id', async(req, res)=>{
//         const {_id}=req.params()
// })

productRouter.get('/getProducts', async (req, res) => {
        // const { productName, amount, description, rating } = req.body
        try {
                const getProducts = await ProductModel.find()

                        res.status(200).json({
                                'msg':"All products is getting",
                                getProducts
                        })
        } catch (error) {
                res.status(404).send(`There is something error ${error}`)
        }
})

productRouter.patch('/updateProduct/:_id', async(req, res)=>{
        const {_id}=req.params
        try {
                const updatedProduct=await ProductModel.findByIdAndUpdate({_id:_id}, req.body)
                res.status(200).json({
                        'msg':"product updation is successfull",
                        updatedProduct
                })
        } catch (error) {
                res.status(404).send(`There is something issues in updation ${error}`)       
        }
})

productRouter.delete('/deleteProduct/:_id', async(req, res)=>{
        const {_id}=req.params
        try {
                const deleteProduct=await ProductModel.findByIdAndDelete({_id:_id}, req.body)
                res.status(200).json({
                        'msg':"product deletion is successfull",
                        deleteProduct
                })
        } catch (error) {
                res.status(404).send(`There is something issues in updation ${error}`)       
        }
})


export default productRouter