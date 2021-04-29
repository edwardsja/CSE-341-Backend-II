//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself! 
const express = require('express');
const router = express.Router();

const app = express();

// set default user array
const users = ['admin', 'user1', 'new user'];
//set default error
let err = 'undefined';

app.set('view engine', 'ejs');

router.post('/addUser', (req, res, next) => {
    // reset error message
    err = 'undefined';

    const userName = req.body.newUser;

    // iterate through users and compare the submitted string to each item in the array
    // if there is a match, display an error message and return
    for (let i = 0; i < users.length; i++) {
        if (userName == users[i]) {
            err = 'That user already exists. Try a different name.';
            return res.redirect('/ta02');
        } 
    }
    // if no match, add the new user to the users array and return
    users.push(req.body.newUser);
    return res.redirect('/ta02');
});

router.post('/removeUser', (req, res, next) => {
    // reset error message
    err = 'undefined';

    const userName = req.body.removeUser;
    // iterate through users and compare the submitted string to each item in the array
    // if there is a match, delete that entry and return to the home page
    for (let i = 0; i < users.length; i++) {
        if (userName == users[i]) {
            users.splice(i, 1);  
            return res.redirect('/ta02');
        }
    }
    // if there is no match, return home with an error
    err = 'The user was not found. Please check your spelling.';
    return res.redirect('/ta02');
});

router.get('/',(req, res, next) => {
    res.render('pages/ta02', { 
        title: 'Team Activity 02', 
        path: '/ta02', // For pug, EJS
        userName: users, 
        error: err,
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});

module.exports = router;