const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('../views/pages/shop/product-list', {
      prods: products,
      title: 'All Products',
      path: '/project01/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then( product => {
      res.render('../views/pages/shop/product-detail', {
        product: product, 
        title: product.title, 
        path: '/project01/products'
    })
  });
        
} 

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('../views/pages/shop/index', {
      prods: products,
      title: 'Shop',
      path: '/project01'
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
        res.render('../views/pages/shop/cart', {
          prods: products,
          title: 'Your Cart',
          path: '/project01/cart'
    });
  });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
      req.user.addToCart(product);
      res.redirect('/project01/cart');
    })
    .then(result => {
      console.log(result);
    })

};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/project01/cart');
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('../views/pages/shop/orders', {
        path: '/project01/orders',
        title: 'Your Orders',
        orders: orders
      });
    })
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/project01/orders');
    })
};

exports.getCheckout = (req, res, next) => {
  res.render('/shop/checkout', {
    path: '/checkout',
    title: 'Checkout'
  });
};
