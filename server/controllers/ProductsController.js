const ProductCategory = require('../models/ProductCategory');
const path = require('path');
const fs = require('fs');
var slugify = require('slugify')
//require multer for the file uploads
var multer = require('multer');
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../src/assets')
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  const fileFilter = (req, file, cb) => {
    if( file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
        ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

var upload = multer({ storage: storage, fileFilter: fileFilter}).single('images');


class ProductsController {

    /**
     * @GET
     */
    async index(req, res, next){
      let productsArr = [];
      let productCategory = await ProductCategory.find({});
      // send all the products in json
      let allProducts = productCategory
        .forEach(p=> p.products.forEach(p=> productsArr.push(p)));

      res.send(productsArr);

      // Debug
      console.log(productsArr);
    }

    /**
     * @POST
     *  
     */
    async store(req, res, next){
      // find the productCategory by id
      let name = req.body.name;
      let description = req.body.description;
      let slug = slugify(name);
      let price = req.body.price;
      let discount = req.body.discount;
      let inStock = req.body.inStock;

      let productCategory = await ProductCategory.findById(req.params.product_category);
      // push to the products field the new object 
      productCategory.products.push({
        name: name,
        description: description,
        slug: slug,
        images: process.env.DEFAULT_IMG,
        price: price,
        discount: discount,
        inStock: inStock,
        category_slug: productCategory.slug
      });

      // Save the new product.
      let savedProductCategory = await productCategory.save();
      return savedProductCategory;
      // Test
      console.log('Saved products:',savedProductCategory);
    }

    /**
     * @GET
     */
    async show(req, res, next){

    }

    /**
     * @PUT
     */
    async update(req, res, next){

    }


    /**
     * @DELETE
     */
    async destroy(req, res, next){

    }


    /**
     *@POST 
     */
    async uploadFile(req, res, next){
 
    }



}

module.exports = new ProductsController;