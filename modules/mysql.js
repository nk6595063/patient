const dbms= require('../dbms');
const bcrypt = require("bcrypt");
const uuid = require('uuid').v4;

const sessions = {};
const document = 'logs';
const document1 = 'd_avail';


const MySql = {
  signup :async (user) => {
    try {
      const db =dbms.getDB();

      const collection = await db.collection(document);
      await collection.createIndex({
        email: 1,
        phone: 1
    }, {
        unique: true
    })
    const result = await collection.insertOne(user);
    return result;
    } catch (err) {
        console.error("Error in MongoDB signup function:", err);
        return { status: 'failed', message: err.message };
    }
},


  

login : async (email, password, res) => {
  try {
    const db = dbms.getDB();
    const collection = await db.collection(document);
    const user = await collection.findOne({ email });
    console.log(user);
    if (!user) {
      throw new Error('Email not found');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      throw new Error(' password incorrect Authentication Failed');
    }

    // Create session
    const sessionId = uuid();
    sessions[sessionId] = { email, password };
    res.set('Set-Cookie', `sessions=${sessionId}`);

    return await collection.find({ email }).toArray();
  } catch (error) {
    console.error('Login error:', error);
    throw { status: 'error', error: error.message || error };
  }
},


forget : async (email, name, password) => {
  try {

    const db = dbms.getDB();
    const collection = await db.collection(document);
    const users = await collection .findOne({ email });
    console.log(users);
    if (!users) {
      throw new Error('invalid mail');
    }

    // Check if the name matches
    if (name !== users.name) {
      throw new Error('lastname does not match not match');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);


    const result = await collection.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    return  result;

  } catch (error) {
    console.error("Error in forget function:", error);
    return { status: 'error', error: error.message || error };
  }
},

d_avail:async()=>{
  try{
    const db =await dbms.getDB();
    const collection = await db.collection(document1);
    return await collection.find().toArray();
  }
  catch (error) {
    console.error('Error fetching users:', error);
    throw error;
}
},


};

module.exports = MySql;