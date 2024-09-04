import mongoose from "mongoose";

const cartItemSchema=mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,

    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
      },
})

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [cartItemSchema],
  });

const CartModel=mongoose.model('cart', cartSchema)

export default CartModel