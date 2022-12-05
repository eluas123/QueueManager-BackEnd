require('dotenv').config();

exports.config = {
    USER_MONGO: process.env.USER_DB,
    PASS_MONGO: process.env.PASS_DB,
    SECRET_TOKEN: process.env.TOKEN_SECRET
}