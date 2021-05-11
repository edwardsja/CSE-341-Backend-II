//TA03 PLACEHOLDER
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const express = require('express');
const router = express.Router();
const fs = require('fs');

let tagFilter = '';

router.post('/tagSelect', (req, res, next) => {
    tagFilter = req.body.filter;
    res.redirect('/ta03');
});

router.get('/', (req, res, next) => {
    const stream = fs.createReadStream('./ta03.json');

    const bufferData = [];
    let products;
    stream.on('data', (chunk) => {
        bufferData.push(chunk);
    });
    stream.on('end', () => {
        products = Buffer.concat(bufferData).toString();
        products = JSON.parse(products);

        // create array of unique tags for filter in view
        let tags = [];
        // create a copy to compare without modifying original values
        let tempProducts = JSON.parse(JSON.stringify(products));
        for (product of tempProducts) {
            let productTags = product.tags;
            //if tags length is zero, use productTags length for second for loop
            let secondLength = tags.length;
            if (tags.length == 0) {
                secondLength = productTags.length;
            }
            for (let i = productTags.length - 1; i > -1; i--) {
                for (let x = 0; x < secondLength; x++) {
                    if (tags[x] == productTags[i]) {
                        // remove matched item
                        productTags.splice(i, 1);
                    }
                }
            }
            // add unmatched items to tag array
            if (tags.length == 0) {
                tags = productTags;
            } else {
                tags = tags.concat(productTags);
            }
        }

        // if a filter was selected, filter the json list
        if (tagFilter != '') {
            let filteredtempProducts = [];
            for (product of products) {
                for (let i= 0; i < product.tags.length; i++) {
                    if (product.tags[i] == tagFilter) {
                        filteredtempProducts.push(product);
                    }
                }
            }
            // wipe product array to fill with filtered list
            products = filteredtempProducts;
        }

        res.render('pages/ta03', {
            title: 'Team Activity 03',
            path: '/ta03', // For pug, EJS 
            productList: products,
            tagList: tags
        });
    });
});

module.exports = router;