const jwt = require("jsonwebtoken");

function safeMode(req, res, next){
    if(req.headers.authorization){
        let token = req.headers.authorization.split(" ")[1];
        let autorizado = jwt.verify(token, process.env.SEGREDO);
        if(autorizado){
            next();
        }else{
            res.status(401).send(`token inválido`);
        }
    }else{
        res.status(401).send("usuário não autorizado");
    }
}

module.exports = {
    safeMode
}