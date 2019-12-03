// call the packages we need
// #1 Add express package to the app
var express = require('express');
// ===============================

var app = express();   
var cors = require('cors');       

// #2 Add body-parser package to the app

// ===============================


// configure app to use bodyParser()
var bodyParser = require('body-parser');
// this will let us get the data from a POST
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// #3 Serve static content in folder frontend
mongoose.connect('mongodb://localhost:27017/coc', { useUnifiedTopology: true, useNewUrlParser: true }); // connect to our database
var Product = require('./models/product');
// ===============================


var port = process.env.PORT || 8080; 

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var products = require('./api');
router.get('/products', products.getAllProducts);
router.get('/products/:pid', products.getProductById);

// #4 Complete the routing for POST, PUT, DELETE
//Product APIs
// index page
app.get('/', function (req, res) {
    res.send('Express is running');
});

app.get('/api', function (req, res) {
    var version = { version: "1.0b" };
    res.json(version);
});

//Product APIs
app.post('/api/product', function (req, res) {
    //Insert data to mongodb
    var newproduct = req.body;
    var product = new Product(newproduct);
    product.save(function (err) {
        if (err) res.status(500).json(err);
        res.json({ status: "Added a product" });
    });
});

app.get('/api/product', function (req, res) {     //showdetail
    Product.find(function (err, product) {
        if (err) res.status(500).json(err);
        res.json(product);
    });
});

app.get('/api/product/:id', function (req, res) {  //sert
    var id = req.params.id;
    Product.find({"_id":id}, function (err, product) {
        if (err) res.status(500).json(err);
        res.json(product);
    });
});

app.put('/api/product/:id', function (req, res) {  //update
    var id = req.params.id;
    var updateproduct = req.body;
    Product.findByIdAndUpdate(id, updateproduct, function(err){
        if (err) res.status(500).json(err);
        res.json({status: "Update a product"});
    })
});

app.delete('/api/product/:id', function (req, res) {  //delete
    var id = req.params.id;
    var updateproduct = req.body;
    Product.findByIdAndRemove(id, updateproduct, function(err){
        if (err) res.status(500).json(err);
        res.json({status: "Delete a product"});
    })
});
// ===============================


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', cors(), router);

// #10 Start the server
var port = process.env.PORT || 8080;
// ===============================
console.log('Magic happens on http://localhost:' + port);