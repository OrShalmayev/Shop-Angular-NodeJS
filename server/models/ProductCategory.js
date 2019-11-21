const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
    name:String,
    description:String,
    slug:String,
    images:String,
    products: [{
        name:String,
        description:String,
        slug:String,
        images:{type:String, default: 'default.png'},
        price:Number,
        discount:Number,
        inStock:Number,
        rating:{type: [Number], default: 0},
        category_slug:String,
        created_at:{type:Date, default:Date.now},
        updated_at:{type:Date, default:Date.now}
    }],
    created_at:{type:Date, default:Date.now},
    updated_at:{type:Date, default:Date.now}
});

const productCategoryModel = mongoose.model('ProductCategory', productCategorySchema);

module.exports = productCategoryModel;