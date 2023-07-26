const { MONGO_URI } = require('../Configurations/readconfigparams');
const { MongoClient } = require('mongodb');

async function main() {
  const client = await MongoClient.connect(MONGO_URI, {
    useUnifiedTopology: true,
  });

  const db = client.db('SmartCabs');
  const allCompanies = await db.collection('Organizations').find().toArray();
  return [db, allCompanies];
}

module.exports = main;
