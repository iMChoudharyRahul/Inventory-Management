const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        maxLength: 40
    },
    price:{
        type: String,
        require: true
    },
    category:{
        type:String
    },
    userId:{
        type: String
    },
    company:{
        type: String
    }
},
  {timestamps: true}
);

module.exports = mongoose.model("products", productSchema)