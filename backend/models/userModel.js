const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a name']
    },
    email: {
        type: String,
        require: [true, 'Please provide an email'],
        unique: [true, 'Email has already an account']
    },
    password: {
        type: String,
        require: [true, 'Please provide a password']

    }
   
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)