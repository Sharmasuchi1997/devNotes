
import express from 'express'
import SponsProductModel from '../models/sponsoredProduct.model.js'

const sponsProductRouter=express.Router()

sponsProductRouter.get('/', (req, res)=>{
    res.send('sponsored product is getting fine')
})

sponsProductRouter.get("/get-products", async(req, res)=>{
    try {
        const sponsorProduct=await SponsProductModel.find()
        res.status(200).json(
            {
                'msg':'getting sponsored product',
                sponsorProduct
            }
        )
        
    } catch (error) {
        res.status(404).send(`There is someting issues ${error}`)
    }


})

sponsProductRouter.post('/post-products', async(req, res)=>{
    const {imageUrl, amount, description, rating}=req.body
    try {
        const postSponsorProduct=new SponsProductModel({
          imageUrl,
          amount, 
          description,
          rating

        })
        await postSponsorProduct.save()
        res.status(201).json({
            'msg':"spnsored product is getting",
            postSponsorProduct
        })
        
    } catch (error) {
        res.status(404).send(`There is something issue ${error}`)
    }
})

export default sponsProductRouter
