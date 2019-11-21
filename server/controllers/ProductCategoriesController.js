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


class ProductCategoriesController {

    /**
     * @GET
     */
    async index(req, res, next){
        let productCategories = await ProductCategory.find({});
        res.send(productCategories);
    }

    /**
     * @POST
     *  
     */
    async store(req, res, next){
        const name = req.body.name;
        const description = req.body.description;
        const slug = slugify(name);
        const images = req.body.images;
        let productCategory = null;
        try {
            if(req.body.images.length){
                productCategory = new ProductCategory({
                    name: name,
                    description: description,
                    slug: slug.toLowerCase(),
                    images: images
                });
            }else{
                productCategory = new ProductCategory({
                    name: name,
                    description: description,
                    slug: slug.toLowerCase(),
                    images: process.env.DEFAULT_IMG
                });
            }

            let savedproductCategory = await productCategory.save();
            res.send(savedproductCategory);   
        } catch (err) {
            console.error(new Error(err))            
        }
    }

    /**
     * @GET
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async show(req, res, next){
        let productCategory = await ProductCategory.findById(req.params.id);
        res.send(productCategory);
    }

    /**
     * @PUT
     */
    async update(req, res, next){
        let updatedproductCategory = null;
        const name = req.body.name;
        const description = req.body.description;
        const slug = slugify(name);
        let updateImage = req.query.updateImage;            // will be true/false
        let updatedImageName = req.query.updatedImageName; // hold the image name
        let deleteImage = req.query.deleteImage;
        console.log(deleteImage);

        // console.log('name:',name, 'description:',description);
        try {
            console.log(req.query)
            // if the admin wants to delete the current image then update the image to default.png
            if(deleteImage){
                updatedproductCategory = await ProductCategory.findByIdAndUpdate(req.params.id, {
                    images: process.env.DEFAULT_IMG
                });
                return updatedproductCategory; 
            }


            // If not updating the image than update the other fields except the images
            if(req.query.updateImage === 'false'){
                console.log('not updating image')
                updatedproductCategory = await ProductCategory
                .findByIdAndUpdate(req.params.id,{
                    name: name,
                    description: description,
                    slug: slug.toLowerCase(),
                });
            }else if(req.query.updateImage === 'true'){
                console.log('updating the image');
                // if the product category as image that is not the default then delete the previous image 
                let productCategory = await ProductCategory.findById(req.params.id); // get the current product category
                // if the image of product category is not the default then delete it from the assets folder
                if(productCategory.images !== process.env.DEFAULT_IMG){
                    fs.unlink(`../src/assets/${productCategory.images}`, (err) => {
                        if(err) console.error(new Error(err))
                    })
                }
                updatedproductCategory = await ProductCategory
                .findByIdAndUpdate(req.params.id,{
                    name: name,
                    description: description,
                    slug: slug.toLowerCase(),
                    images: updatedImageName
                });
            }
            res.send(updatedproductCategory);
            
        } catch (err) {
            console.error(new Error(err))
        }

    }


    /**
     * @DELETE
     */
    async destroy(req, res, next){
        // getting the image source from the url query
        let imagePath = req.query.imagePath;
        // getting the product category id from the params
        let deletedProduct = await ProductCategory.findByIdAndDelete(req.params.id);
        // if there is an image then delete the image file..
        if(imagePath){
            fs.unlink(imagePath, (err) => {
                if(err) console.error(new Error(err))
            })
        }
        return deletedProduct;
    }



    async uploadFile(req, res, next){
        let fileName = '';
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                console.error(new Error(err));
                return res.status(422).send(err)
            }  
            // No error occured.
            fileName = req.file;
            return res.send(fileName); 
        });     
    }
}

module.exports = new ProductCategoriesController;