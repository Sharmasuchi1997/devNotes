// import express from 'express'
// import CartModel from '../models/cartModel'

// const cartRouter=express.Router()

// cartRouter.get('/', (req, res)=>{
//     res.send('cart route is here')
// })

// cartRouter.post('/cart', async(req, res)=>{
//     const {userId, productId, quantity}=req.body
//     try {
//         let cart = await CartModel.findOne({ userId });
//         res.status(200).json({
//             'msg':"cart items is posting",
//             cart
//         })
        
//     } catch (error) {
//         res.status(404).send(`There is an issues in posting ${error}`)
//     }
// })



// export default cartRouter