# product-categories

Nodejs:
-------

# Categories the product

This project was generated with node version 10.15.3

# Setup

Need to install required npm package to run Angular & Nodejs project.

npm install

## Development server

Run sudo node server.js or sudo nodemon server.js to start the backend server & Navigate to  `http://localhost:3000` to check the server start.

# To List all category

Endpoint: http://localhost:3000/backend/categories

Method: (POST)
------

Header: 
-------

Content-Type: application/x-www-form-urlencoded

Request Body:
------------
data:{}
action:categoriesType

Response:
---------

{
  "status_code": true,
  "message": "Category list found",
  "data": [
    {
      "_id": "5fb1ebcb768ec4198fd5b242",
      "category_name": "Shoe",
      "category_description": "Shoe category",
      "category_status": "Y",
      "__v": 0
    }
  ]
}

# To insert new category details

Endpoint: http://localhost:3000/backend/categories

Method: (POST)
------

Header: 
-------

Content-Type: application/x-www-form-urlencoded

Request Body:
------------
action:addNewCategories
data:{
  "categories": [
    {
      "categoryName": "Dress",
      "categoryDescription": "Dress category"
    },
    {
      "categoryName": "Toys",
      "categoryDescription": "Toys category"
    }
  ]
}


Response:
---------

{
  "status_code": true,
  "message": "New category details inserted",
  "data": [
    {
      "_id": "5fb21ff680360337c79ff749",
      "category_name": "Dress",
      "category_description": "Dress category",
      "category_status": "Y",
      "__v": 0
    },
    {
      "_id": "5fb21ff680360337c79ff742",
      "category_name": "Toys",
      "category_description": "Toys category",
      "category_status": "Y",
      "__v": 0
    }
  ]
}

# To list all categories with assosiated products

Endpoint: http://localhost:3000/backend/categories

Method: (POST)
------

Header: 
-------

Content-Type: application/x-www-form-urlencoded

Request Body:
------------
action:categoriesList
data:{}


Response:
---------

{
  "status_code": true,
  "message": "Categories list with assosiated product",
  "data": [
    {
      "categoryName": "Shoe",
      "categoryDescription": "Shoe category",
      "productCount": 2,
      "products": [
        {
          "productName": "Nike Air VaporMax 2020 FK MS",
          "productDescription": "Men's shoe",
          "availableQuantity": 10,
          "productPrice": "$250"
        },
        {
          "productName": "Nike Air VaporMax 2020 FK",
          "productDescription": "Men's shoe",
          "availableQuantity": 10,
          "productPrice": "$220"
        }
      ]
    }
  ]
}

# To list all product details

Endpoint: http://localhost:3000/backend/products

Method: (POST)
------

Header: 
-------

Content-Type: application/x-www-form-urlencoded

Request Body:
-------------
data:{}
action:productList

Response:
---------
{
  "status_code": true,
  "message": "Product list found",
  "data": [
    {
      "_id": "5fb1f0cce63d771c73d2eaf1",
      "product_name": "Nike Air VaporMax 2020 FK MS",
      "product_description": "Men's shoe",
      "category_id": "Shoe",
      "quantity": 10,
      "price": "$250",
      "status": "Y",
      "__v": 0
    }
  ]
}

# To insert new product details with category name

Endpoint: http://localhost:3000/backend/products

Method: (POST)
------

Header: 
-------

Content-Type: application/x-www-form-urlencoded

Request Body:
-------------
action:addNewProduct
data:{
  "products": [
    {
      "productName": "Puma Shoe",
      "available": 10,
      "description": "Puma shoe desc",
      "categoryName": "Shoe",
      "price": "₹ 3,759"
    }
  ]
}

Response:
---------

{
  "status_code": true,
  "message": "New Product details inserted",
  "data": [
    {
      "_id": "5fb2227580360337c79ff74b",
      "product_name": "Puma Shoe",
      "product_description": "Puma shoe desc",
      "category_id": "Shoe",
      "quantity": 10,
      "price": "₹ 3,759",
      "status": "Y",
      "__v": 0
    }
  ]
}
