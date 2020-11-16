var dbo = require('./db');
const CONFIG = require('../config/config');

var categorySchema = dbo.Schema({
    category_name: {
        type: String,
        required: true
    },
    category_description: {
        type: String,
        required: false
    },
    category_status: {
        type: String,
        required: true
    }
});

var category = module.exports = dbo.model(CONFIG['TABLES']['CATEGORYTABLE'], categorySchema);

module.exports.getCategoriesType = function(callback, limit) {
    category.find(callback).limit(limit);
}

module.exports.listAllCategories = function(callback) {
    category.aggregate([{
        $lookup: {
            from: CONFIG['TABLES']['PRODUCTTABLE'],
            localField: 'category_name',
            foreignField: 'category_id',
            as: 'productList'
        }
    }], callback);
}