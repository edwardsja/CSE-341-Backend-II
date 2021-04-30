const express = require('express');
const router = express.Router();

const app = express();

app.set('view engine', 'ejs');

const books = [];

router.post('/addBook', (req, res, next) => {
    const newBook = req.body;

    books.push(newBook);
    return res.redirect('/prove02/list');
});

router.use('/list', (req, res, next) => {
    res.render('./pages/prove02-display.ejs', {
        title: 'Book List',
        path: '/prove02/list',
        bookList: books
    });
});

// default
router.get('/',(req, res, next) => {
    res.render('./pages/prove02.ejs', { 
        title: 'Prove 02', 
        path: '/prove02', // For pug, EJS
    });
});

module.exports = router;