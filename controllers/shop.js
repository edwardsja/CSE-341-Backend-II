const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('../views/pages/shop/product-list', {
      prods: products,
      title: 'All Products',
      path: '/project01/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('../views/pages/shop/product-detail', {
            product: product, 
            title: product.title, 
            path: '/project01/products'
        });
    });
} 

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('../views/pages/shop/index', {
      prods: products,
      title: 'Shop',
      path: '/project01'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('../views/pages/shop/cart', {
    path: '/cart',
    title: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/project01/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('/shop/orders', {
    path: '/orders',
    title: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('/shop/checkout', {
    path: '/checkout',
    title: 'Checkout'
  });
};
