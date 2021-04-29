const express = require('express');
const router = express.Router();

const app = express();

app.set('view engine', 'ejs');


// default
router.get('/',(req, res, next) => {
    res.render('prove02.ejs', { 
        title: 'Prove 02', 
        path: '/', // For pug, EJS
    });
});

module.exports = router;