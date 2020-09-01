const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

MongoClient.connect(
    uri,
    {
        useUnifiedTopology: true
    }, 
    function (err, client) {
        const dbName = process.argv[2];
        const collectionName = process.argv[3];
        const id = process.argv[4]
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.remove({
            _id: id
        }, (err, _) => {
            client.close();
        });
    }
);