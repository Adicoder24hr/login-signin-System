const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, "GDSC_SecretKey",(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

function generateAccessToken(email){
    return jwt.sign({data: email}, "GDSC_SecretKey", {
        expireIn: "1h"
    });
};
module.exports = {
    authenticateToken,
    generateAccessToken,
} ;