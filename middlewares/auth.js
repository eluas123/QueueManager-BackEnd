const jwt = require("jsonwebtoken");
const { config } = require('../config/secret')


exports.auth = async(req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You need to send token to this url route" });
    }
    try {
        let decodeToken = jwt.verify(token, `${config.SECRET_TOKEN}`);
        req.tokenData = decodeToken;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Token invalid (if you hacker) or expired!" })
    }
}

exports.authAdmin = async(req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You need to send token to this url route" });
    }
    try {
        let decodeToken = jwt.verify(token, `${config.SECRET_TOKEN}`);
        // check if user admin
        if (decodeToken.role == "admin") {
            req.tokenData = decodeToken;
            next();
        } else {
            return res.status(401).json({ msg: "You need to send token of admin to be here" });
        }
    } catch (err) {
        res.status(401).json({ msg: "Token invalid (if you hacker) or expired!" });
    }
}