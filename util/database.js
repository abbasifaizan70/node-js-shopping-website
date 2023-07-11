const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb://root:x81AlHYdnCFubV4b@ac-iaxherf-shard-00-00.vhiiq32.mongodb.net:27017,ac-iaxherf-shard-00-01.vhiiq32.mongodb.net:27017,ac-iaxherf-shard-00-02.vhiiq32.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-25noxb-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
