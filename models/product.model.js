import mongoose from "mongoose";

const productSchema=mongoose.Schema({
   
    "productName":{type:String, required:true},
    "amount":{type:Number, required:true},
    "description":{type:String, required:true},
    "rating":{type:Number, required:true}

})

const ProductModel=mongoose.model('product', productSchema)

export default ProductModel