const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxLength: 20
    },
    email:  {
        type: String,
        require: true,
        unique:  true
    },
    password:  {
        type: String,
        require:  true
    }
},
{ timestamps: true },
);

module.export = mongoose.model('User', AuthSchema);