const mongoose = require('mongoose');

const shellerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
    shellItems: {
        type: String,
    }
}, { timestamps: true })

const Sheller = mongoose.model('shellere', shellerSchema);

module.exports = Sheller;