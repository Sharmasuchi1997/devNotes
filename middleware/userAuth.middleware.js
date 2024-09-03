import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'

const userAuth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
 try {
       jwt.verify(token, process.env.SECRET_KEY, (err, decode)=>{
        if(err){
            res.status(401).send(`There is something error ${err}`)
        }
        else{
            req.body.username=decode.name
            req.body.role=decode.role
            next()
        }
       })
      
} catch (error) {
        res.status(401).json({ "msg": "Invalid token" })
    }
}

export default userAuth
