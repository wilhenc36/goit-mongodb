const moment = require('moment');
const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).json({
            result: null,
            message: "Your request doesn't have authorization header"
        });
    }

    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6IkFudG9uaW8gUGF6IiwiaWQiOiI2NTM5Y2UwMWFiZTYzZjhhMDk1NTJhMTUiLCJyb2wiOiJTRUxMRVIiLCJpYXQiOjE2OTg3MTYyNzksImV4cCI6MTY5ODczMDY3OX0.ko6EHgEMaqKyoH2_61lsX4SwY19HdlwKvGDPNvJE33A

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET)

    console.log(payload)

    if(payload.exp <= moment().unix()) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            message: "Invalid token."
        })
    }

    req.user = payload.id;
    next();
}

module.exports = {
    ensureAuthenticated
}