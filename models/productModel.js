var dbo = require('./db');
const CONFIG = require('../config/config');

var productSchema = dbo.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: false
    },
    category_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

var products = module.exports = dbo.model(CONFIG['TABLES']['PRODUCTTABLE'], productSchema);

module.exports.getProductList = function(callback, limit) {
    products.find(callback).limit(limit);
}

module.exports.dropCollection = function(callback) {
    products.collection.drop(callback);
}