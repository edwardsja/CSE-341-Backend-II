const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('../views/pages/edit-product', {
    title: 'Add Product',
    path: '/project01/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const author = req.body.author;
  const isbn = req.body.isbn;
  const product = new Product(title, imageUrl, description, price, author, isbn);
  product.save();
  res.redirect('/project01');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
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

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('../views/pages/products', {
      prods: products,
      title: 'Admin Products',
      path: '/admin/products'
    });
  });
};
