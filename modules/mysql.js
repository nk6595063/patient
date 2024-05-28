const { LoginUser, getDB } = require('../dbms');


const bcrypt = require("bcrypt");
const uuid = require('uuid').v4;
// const bodyParser = require("body-parser");
// var cookieSession = require('cookie-session')
const sessions = {};

const MySql = {
  signup :async (user) => {
    try {
      const db = getDB();

      const collection = await db.collection((LoginUser.collection.name));
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
    // Find user by email
    const user = await LoginUser.findOne({ email });
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

    // return db.LoginUser.findMany();
    return await LoginUser.find({ email });
  } catch (error) {
    console.error('Login error:', error);
    throw { status: 'error', error: error.message || error };
  }
},


forget : async (email, name, password) => {
  try {
    // const db = getDB();
    const users = await LoginUser.findOne({ email });
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

    // Update the user's password
    users.password = hashedPassword;
    console.log(users);
  

    return   await users.save();

  } catch (error) {
    console.error("Error in forget function:", error);
    return { status: 'error', error: error.message || error };
  }
},


};

module.exports = MySql;