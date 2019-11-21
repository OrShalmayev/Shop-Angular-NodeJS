const express =  require('express');
const Router = express.Router();

/****************************** Controllers ***********************************/
const ProductCategoryController = require('../controllers/ProductCategoriesController');
const ProductsController = require('../controllers/ProductsController');
const UsersController = require('../controllers/UsersController');
/****************************** ProductCategoryController ***********************************/
Router.get('/api/product-categories', ProductCategoryController.index);
Router.post('/api/product-categories', ProductCategoryController.store);
Router.delete('/api/product-categories/:id', ProductCategoryController.destroy);
Router.get('/api/product-categories/:id', ProductCategoryController.show);
Router.put('/api/product-categories/:id', ProductCategoryController.update);
/****************************** ProductsController ***********************************/
Router.get('/api/products', ProductsController.index);
Router.post('/api/products/:product_category', ProductsController.store);
/****************************** UsersController ***********************************/
Router.post('/api/register', UsersController.store);
Router.get('/api/register/:email', UsersController.emailExists);

// upload file 
Router.post('/api/upload-file', ProductCategoryController.uploadFile);


module.exports = Router;