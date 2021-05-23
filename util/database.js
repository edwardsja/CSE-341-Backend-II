// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = (cb) => {
//     MongoClient.connect('mongodb+srv://nodejs:S7uM1aEGtWTSz9R1@cluster0.cpjqs.mongodb.net/project01?retryWrites=true&w=majority')
//         .then(client => {
//             console.log('Connected!');
//             _db = client.db();
//             cb();
//         })
//         .catch(err => {
//             console.log(err);
//             throw err;
//         });
// };

// const getDb = () => {
//     if (_db) {
//         return _db;
//     }
//     throw 'No database found!';
// }

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;