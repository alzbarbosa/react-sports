const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Place', placeSchema);