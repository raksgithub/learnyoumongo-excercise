const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

MongoClient.connect(
    uri,
    {
        useUnifiedTopology: true
    }, 
    function (err, client) {
        const db = client.db('learnyoumongo');
        const collection = db.collection('parrots');
        const age = parseInt(process.argv[2]);
        collection
            .find(
                { age: { $gt: age } }, 
                { 
                    projection: {
                        _id: 0,
                        name: 1, 
                        age: 1
                    }
            })
            .toArray(function (err, documents) {
                console.log(documents);
                client.close();
            });
    }
);