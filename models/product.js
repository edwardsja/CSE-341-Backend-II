// const fs = require('fs');
// const path = require('path');

// const Cart = require('./cart');

// const p = path.join(__dirname, '../',
// 'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(inputTitle, inputUrl, inputDesc, inputPrice, inputAuthor, inputISBN, id, userId) {
    this.title = inputTitle;
    this.imageUrl = inputUrl;
    this.description = inputDesc;
    this.price = inputPrice;
    this.author = inputAuthor;
    this.isbn = inputISBN;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this });
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    
    return dbOp
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then()
    .catch(err => {
      console.log(err);
    });
  }

  static fetchAll(cb) {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId)})
    .next()
    .then(product => {
      console.log(product);
      return product;
    })
    .catch(err => {
      console.log(err);
    });
  }
};

module.exports = Product;