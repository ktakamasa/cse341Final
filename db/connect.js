const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let _db;

// const initDb = (callback) => {
//   if (_db) {
//     console.log('Database is already initialized!');
//     return callback(null, _db);
//   }
//   MongoClient.connect(process.env.MONGODB_URI)
//     .then((client) => {
//       _db = client;
//       callback(null, _db);
//     })
//     .catch((err) => {
//       callback(err);
//     });
// };
const initDb = async () => {
  if (_db) {
    console.log('Database is already initialized!');
    return Promise.resolve(_db);
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  _db = client;
  return _db;
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized!');
  }
  return _db;
};

module.exports = { initDb, getDb };
