"use strict";

var Product = require('../models/product');

exports.getAddProduct = function (req, res, next) {
  res.render('../views/pages/edit-product', {
    title: 'Add Product',
    path: '/project01/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = function (req, res, next) {
  var title = req.body.title;
  var imageUrl = req.body.imageUrl;
  var price = req.body.price;
  var description = req.body.description;
  var author = req.body.author;
  var isbn = req.body.isbn;
  var product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    author: author,
    isbn: isbn,
    userId: req.user
  });
  product.save().then(function (result) {
    res.redirect('/project01/admin/products');
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getEditProduct = function (req, res, next) {
  var editMode = req.query.edit;
  var prodId = req.params.productId;
  Product.findById(prodId).then(function (product) {
    if (!product) {
      return res.redirect('/');
    }

    res.render('../views/pages/edit-product', {
      title: 'Edit Product',
      path: '/project01/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = function (req, res, next) {
  var prodId = req.body.productId;
  var updatedTitle = req.body.title;
  var updatedImageUrl = req.body.imageUrl;
  var updatedPrice = req.body.price;
  var updatedDescription = req.body.description;
  var updatedAuthor = req.body.author;
  var updatedISBN = req.body.isbn;
  Product.findById(prodId).then(function (product) {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImageUrl;
    product.author = updatedAuthor;
    product.isbn = updatedISBN;
    return product.save();
  }).then(function (result) {
    res.redirect('/project01/admin/products');
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getProducts = function (req, res, next) {
  Product.find() // .populate('userId')
  .then(function (products) {
    res.render('../views/pages/products', {
      prods: products,
      title: 'Admin Products',
      path: '/project01/admin/products'
    });
  });
};

exports.postDeleteProduct = function (req, res, next) {
  var prodId = req.body.productId;
  Product.findByIdAndRemove(prodId).then(function () {
    res.redirect('/project01/admin/products');
  });
};