const mongoose = require('mongoose')
const Product = require('./models/productSchema')
// #5 Change URL to your local mongodb
const url = "'mongodb://localhost:27017/coc'";
// ===============================

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

function getAllProducts(req, res) {

    Product.find({}, function (err, data) {   
        if(err){
            res.status(500).json({ status: "error", message: err});
        }     
        res.json(data);
    });
}

function getProductById(req, res) {    
    // #6 Get a product by ID
    var pid = req.params.pid;
    Product.find({"_id":pid}, function (err, product) {
        if (err) res.status(500).json(err);
        res.json(product);
    });
    // ===============================
}

function updateProductById(req, res) {
    var payload = req.body
    var pid = req.params.pid;    
    // #7 Update a product by ID (findByIdAndUpdate)
    Product.findByIdAndUpdate(pid, payload, function(err){
        if (err) res.status(500).json(err);
        res.json({status: "Update a product"});
    })
    // ===============================
}

function deleteProductById(req, res) {
    var pid = req.params.pid;    
    // #8 Delete a product by ID (findByIdAndDelete)
    Product.findByIdAndDelete(pid, function(err){
        if (err) res.status(500).json(err);
        res.json({status: "Delete a product"});
    })
    // ===============================
}

function addProduct(req, res) {
    var payload = req.body
    // #9 Add a new product 
    var product = new Product(newproduct);
    product.save(function (err) {
        if (err) res.status(500).json(err);
        res.json({ status: "Added a product" });
    });
    // ===============================
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    addProduct: addProduct,
    updateProductById: updateProductById,
    deleteProductById, deleteProductById
};