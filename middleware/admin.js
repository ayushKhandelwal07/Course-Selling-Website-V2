const {JWT_SECRET} = require("../config")
const jwt = require("jsonwebtoken")

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization
    const word = token.split(" ")
    const jwtToken = word[1]

    try{
        const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
        if(decodedValue.username){
            next();
        }else{
            res.status(404).json({
                msg : "You are not authenticated"
            })
        }
    }catch(e){
        console.log(e);
        res.json("Invalid Inputs")
    }
}

module.exports = adminMiddleware;