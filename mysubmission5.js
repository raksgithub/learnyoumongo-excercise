const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';

MongoClient.connect(
    uri,
    {
        useUnifiedTopology: true
    }, 
    function (err, client) {
        const size = process.argv[2];
        const db = client.db('learnyoumongo');
        const collection = db.collection('prices');
        collection.aggregate([
            {
                $match: { size }
            },
            {
                $group: {
                    _id: null,
                    average: {
                        $avg: '$price' 
                    }
                }
            }
        ]).toArray((_, docs) => {
            console.log(Number(docs[0].average).toFixed(2));
            client.close();
        });
    }
);