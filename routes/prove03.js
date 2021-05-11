const express = require('express');
const router = express.Router();

const app = express();

app.set('view engine', 'ejs');

const books = [];

// default
router.get('/',(req, res, next) => {
    res.render('./pages/prove03.ejs', { 
        title: 'Prove 03', 
        path: '/prove03', // For pug, EJS
    });
});

module.exports = router;