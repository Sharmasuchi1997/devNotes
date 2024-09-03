import express from "express";
import userAuth from "../middleware/userAuth.middleware.js";

const returnRouter=express.Router()

returnRouter.get('/', userAuth, (req, res)=>{
    res.send('return route is here')
})




export default returnRouter