const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../',
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(inputTitle, inputUrl, inputDesc, inputPrice, inputAuthor, inputISBN) {
    this.title = inputTitle;
    this.imageUrl = inputUrl;
    this.description = inputDesc;
    this.price = inputPrice;
    this.author = inputAuthor;
    this.isbn = inputISBN;
  }

  save() {
    this.id = (Math.random()*100000000000000000).toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => {
        return p.id === id;
      });
      cb(product);
    });
  }
};
