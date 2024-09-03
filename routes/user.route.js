import mongoose from "mongoose";
import express from "express";
import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.send('user route is getting')
})

userRouter.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body
    console.log(req.body)
    try {

        if (password === confirmPassword) {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        "msg": "Internal server error"
                    })
                }

                const user = new UserModel({
                    name, email, password: hash, role
                })

                const existUser = await UserModel.findOne({ email: email })      // check is there duplicate email id exist or not? 
                if (existUser) {
                    return res.send('This email_id is already registered')
                }

                await user.save()
                console.log(user.email)

                res.status(201).json({
                    "msg": "user registration success"
                })
         })

        }
        else {
            res.send('Please recheck your entered password')
        }

    } catch (error) {
        res.status(404).send(`There is something error ${error}`)

    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                "msg": "User not found"
            })
        }
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                console.log(password, user.password)
              
                if (err) {
                    return res.status(500).json({ "msg": `Internal server error ${err}` })
                }
                if (result) {
                    const token = jwt.sign({ name: user.name }, process.env.SECRET_KEY)
                    return res.status(200).json({
                        "msg": "Hey user you are logged in",
                        token
                    })
                }
                if(password!==user.password)
                {
                    res.send("you have typed incorrect password , you can redirect to the forgot password")
                    
                  
                }
            })
        }


    } catch (error) {
        res.status(400).json({
            "msg": `Invalid credentials please login again ${error}`
        })

    }
})

userRouter.post('/forgot-password', async(req, res)=>{
    const {email, password, confirmPassword}=req.body
    try {
        if(password===confirmPassword){
            
            const user=await UserModel.findOne({email:email})
          if(!user){
           return res.status(400).send(`User with this email_id is not found `)
          }
            
            bcrypt.hash(password, 5, async (err, hash)=>{
                    if(err){
                        return res.status(401).send(`There is something issue ${err}`)
                    }
                    
                    user.password=hash
                    await user.save()
                     return res.status(200).send('you are logged in with the new password')
                    
                })
        }
        else{
            res.send('please type correct password')
        }


    } catch (error) {
        res.status(400).send(`There is something issues ${error}`)
        
    }
})


export default userRouter