const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

MongoClient.connect(
    uri,
    {
        useUnifiedTopology: true
    }, 
    function (err, client) {
        const dbName = process.argv[2];
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.update({
            username: 'tinatime'
        }, {
            $set: {
                age: 40
            }
        }).then((_, result) => {
            client.close();
        });
    }
);