/**
 * Import product model & categories model to select & get schema to insert new products
 */
ProductModel = require('../models/productModel');

module.exports = {
    path: '/backend/products',
    priority: 1,
    init: function(app) {},
    ALL: function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,POST');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        next();
    },
    GET: function(req, res) {

    },
    POST: function(req, res, next) {
        requestData = JSON.parse(req.body['data']);
        // console.log(req.body['action']);

        switch (req.body['action']) {
            case 'productList':
                /**
                 * This case used to get product list
                 */
                ProductModel.getProductList(function(err, response) {
                    if (err) {
                        responseData = {
                            status_code: false,
                            message: err
                        };
                    } else {
                        if (response.length > 0) {
                            responseData = {
                                status_code: true,
                                message: "Product list found",
                                data: response
                            };
                        } else {
                            responseData = {
                                status_code: false,
                                message: "Product list not found",
                                data: response
                            }
                        }
                    }
                    res.json(responseData)
                });
                break;
            case 'addNewProduct':
                /**
                 * This is case used to insert multiple product details
                 */
                insertArray = [];
                requestData['products'].forEach(item => {
                    insertArray.push({
                        'product_name': item['productName'],
                        'product_description': item['description'],
                        'category_id': item['categoryName'],
                        'quantity': item['available'],
                        'price': item['price'],
                        'status': 'Y'
                    });
                });

                ProductModel.insertMany(insertArray, function(err, response) {
                    if (err) {
                        responseData = {
                            status_code: false,
                            message: err
                        };
                    } else {
                        responseData = {
                            status_code: true,
                            message: "New Product details inserted",
                            data: response
                        };
                    }
                    res.json(responseData);
                });
                break;
            case 'dropProduct':
                /**
                 * This case used to drop the products collections
                 */
                ProductModel.dropCollection(function(err, response) {
                    if (err) {
                        responseData = {
                            status_code: false,
                            message: err
                        };
                    } else {
                        responseData = {
                            status_code: true,
                            message: "Products collection dropped"
                        }
                    }
                    res.json(response);
                });
                break;
            default:
                res.json({ status_code: false, message: "Invalid action" });
                break;
        }
    }
}