const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

MongoClient.connect(
    uri,
    {
        useUnifiedTopology: true
    }, 
    function (err, client) {
        const age = process.argv[2];
        const db = client.db('learnyoumongo');
        const collection = db.collection('parrots');
        collection.countDocuments({
            age: {
                $gt: +age
            }
        }, (err, count) => {
            console.log(count);
            client.close();
        });
    }
);