const mongoose = require('mongoose');
const { config } = require('../config/secret')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb+srv://${config.USER_MONGO}:${config.PASS_MONGO}@cluster0.wu98c.mongodb.net/QueueManager`);
    console.log("Mongo Connect Queue Manager")
}