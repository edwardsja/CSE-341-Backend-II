const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
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
    })
    .catch(err => {
      console.log(err);
    });

};
        
 

exports.getIndex = (req, res, next) => {
  Product.find()
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
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
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
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/project01/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/project01/cart');
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        }, 
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/project01/orders');
    })
    .catch(err => {
      console.log(err);
    })
};

// exports.getCheckout = (req, res, next) => {
//   res.render('/shop/checkout', {
//     path: '/checkout',
//     title: 'Checkout'
//   });
// };

exports.getOrders = (req, res, next) => {
  console.log(req.user._id);
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('../views/pages/shop/orders', {
        path: '/project01/orders',
        title: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};