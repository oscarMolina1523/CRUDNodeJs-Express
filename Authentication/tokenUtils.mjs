import jsonWebToken from 'jsonwebtoken';

function generateAccessToken(user){
    return jsonWebToken.sign(user, process.env.SECRET, {expiresIn: '1h'})
}

function validateToken(req, res, next){
    const accesToken=req.headers['authorization'];
    if(!accesToken) res.send('Access denied');

    jsonWebToken.verify(accesToken, process.env.SECRET, (error, user)=>{
        if(error){
            res.send('Access denied, token expired or incorrect')
        }else{
            next()
        }
    })
}

export { generateAccessToken, validateToken };