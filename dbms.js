const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:admin@cluster0.l2lbhpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Use 127.0.0.1 instead of localhost
const client = new MongoClient(uri);

let db;

async function connect() {
  try {
    await client.connect();
    db = client.db('Doctor');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function getDB() {
  return db;
}

module.exports = { connect, getDB };
