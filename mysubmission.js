const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

MongoClient.connect(
    uri,
    {
        useUnifiedTopology: true
    }, 
    function (err, client) {
        const db = client.db('learnyoumongo');
        const collection = db.collection('users');
        const firstName = process.argv[2];
        const lastName = process.argv[3];
        collection.insertOne({ firstName, lastName }, (err, _) => {
            collection.findOne(
                { firstName, lastName }, 
                { 
                    projection: { 
                        _id: 0, 
                        firstName: 1, 
                        lastName: 1
                    } 
                }).then(document => {
                    console.log(JSON.stringify(document));
                    client.close();
                });
        });
    }
);