const mongoose = require('mongoose')

//Schema design for react-base-app containing certain fields in database
let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    }

})

//Passes our Schema to the the Mongoose model
//Exporting Model 
module.exports = mongoose.model('User', userSchema)