const mongoose = require('mongoose');


const connectDb = () => {
    const MongoDb = process.env.MONGO_URL;

    mongoose.connect(MongoDb, {useUnifiedTopology: true})
    .then(() => {
        console.log('Database connected successfully')
    })
    .catch((error) => {
        console.log('Error connecting to Database ' +error)
    })
}

module.exports = connectDb