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
  const product = new Product(title, imageUrl, description, price, author, isbn, null, req.user._id);
  product.save()
  .then(result => {
    res.redirect('/project01/admin/products');
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('../views/pages/edit-product', {
      title: 'Edit Product',
      path: '/project01/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedAuthor = req.body.author;
  const updatedISBN = req.body.isbn;

  const product = new Product(updatedTitle, updatedImageUrl, updatedDescription, updatedPrice, updatedAuthor, updatedISBN, prodId);
  product.save()
  .then(result => {
    res.redirect('/project01/admin/products');
  })
  .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('../views/pages/products', {
      prods: products,
      title: 'Admin Products',
      path: '/project01/admin/products'
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/project01/admin/products');
};
