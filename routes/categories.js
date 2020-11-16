/**
 * Import categories model to select & get the schema to insert new categories
 */
categoryModel = require('../models/categoriesModel');

module.exports = {
    path: '/backend/categories',
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

        switch (req.body['action']) {
            case 'categoriesType':
                /**
                 * This case used to get categories type
                 */
                categoryModel.getCategoriesType(function(err, response) {
                    if (err) {
                        responseData = {
                            status_code: false,
                            message: err
                        };
                    } else {
                        if (response.length > 0) {
                            responseData = {
                                status_code: true,
                                message: "Category list found",
                                data: response
                            };
                        } else {
                            responseData = {
                                status_code: false,
                                message: "Category list not found",
                                data: response
                            }
                        }
                    }
                    res.json(responseData);
                });
                break;
            case 'addNewCategories':
                /**
                 * This case used to insert new categories details
                 */
                insertArray = [];
                requestData['categories'].forEach(item => {
                    insertArray.push({
                        'category_name': item.categoryName,
                        'category_description': item.categoryDescription,
                        'category_status': 'Y'
                    });
                });
                categoryModel.insertMany(insertArray, function(err, response) {
                    if (err) {
                        responseData = {
                            status_code: false,
                            message: err
                        };
                    } else {
                        responseData = {
                            status_code: true,
                            message: "New category details inserted",
                            data: response
                        };
                    }
                    res.json(responseData);
                });
                break;
            case 'categoriesList':
                /**
                 * This case used to get assosiated categories with product details
                 */
                categoryModel.listAllCategories(function(err, response) {
                    if (err) {
                        responseData = {
                            status_code: false,
                            message: err
                        };
                    } else {
                        if (response.length > 0) {
                            categoriesList = [];
                            response.forEach(categories => {
                                products = [];
                                categories['productList'].forEach(product => {
                                    products.push({
                                        'productName': product.product_name,
                                        'productDescription': product.product_description,
                                        'availableQuantity': product.quantity,
                                        'productPrice': product.price
                                    })
                                });
                                categoriesList.push({
                                    'categoryName': categories.category_name,
                                    'categoryDescription': categories.category_description,
                                    'productCount': products.length,
                                    'products': products
                                })
                            });
                            responseData = {
                                status_code: true,
                                message: "Categories list with assosiated product",
                                data: categoriesList
                            };
                        }
                    }
                    res.json(responseData);
                })
                break;
            default:
                res.json({ status_code: false, message: "Invalid action" });
                break;
        }
    }
}