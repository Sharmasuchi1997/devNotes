import mongoose from "mongoose";

const sponsProduct=mongoose.Schema({
    "imageUrl":String,
    "amount":Number,
    "description":String,
    "rating":Number
})

const SponsProductModel=mongoose.model("sponsoredProduct", sponsProduct)

export default SponsProductModel