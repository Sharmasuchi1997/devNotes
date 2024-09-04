

const checkAdmin=async(req, res, next)=>{

    console.log("req.body.role-", req.body.role)
    console.log("req.body.name", req.body.name)
        if(req.body.role=='admin'){
            next()
        }
        else{
            res.send('You are not authorized to access this route')
        }
}

export default checkAdmin