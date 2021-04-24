const fs = require('fs');

function requestHandler(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<h1>Hello from NodeJS!</h1>');
        res.write('<p>Please enter your name below to be added to our users list</p>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Send</button></form>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        //get information from users.text, then display list of users
        fs.readFile('./prove01-users.txt', (err, data) => {
            const bufferData = [];
            bufferData.push(data);

            const parsedData = Buffer.concat(bufferData).toString();

            // create array of names
            const users = parsedData.split(',');

            res.write('<html>');
            res.write('<h1>Current Users:</h1>');
            res.write('<ul>');

            // loop through users array and res.write each user on its own li
            for (const user of users) {
                res.write(`<li>${user}</li>`);
            }

            res.write('</ul>');
            res.write('</html>');
            return res.end();

        });
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        // create variable out of the end event listener to use outside of the event lister scope
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            let newUser = parsedBody.split('=')[1];

            //write new user's name to local file
            fs.appendFile('./prove01-users.txt', `,${newUser}`, () => {
                //wait until data written to file, then call /users
                res.statusCode = 302;
                res.setHeader('Location', '/users');
                return res.end();
            }) 
        });
    }
}

exports.handler = requestHandler;