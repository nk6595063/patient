// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host    :"localhost",
//     user    : "root",
//     password:"root123",
//     database:"nodejs"
    
// });
// connection.connect((err)=>{
//     if(err)
//         {
//            console.error("Error connection database" ,err);
//         }
//         console.log('database connection successfull');
    
// });

// module.exports=connection;


// const mongoose = require('mongoose');
// // const app = express();
// // const port = 5000;

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/new")
//     .then(() => {
//         console.log('Connection successfully established');
//     })
//     .catch((err) => {
//         console.error('Error connecting to MongoDB:', err);
//     });



// Define a schema and model for login users

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, maxlength: 16, required: true },
    email: { type: String, maxlength: 256, unique: true, required: true },
    birthday: { type: String, maxlength: 256, required: true },
    gender: { type: String, maxlength: 256, required: true },
    place: { type: String, maxlength: 256, required: true },
    city: { type: String, maxlength: 256, required: true },
    disease: { type: String, maxlength: 256, required: true },
    phone: { type: Number, required: true },
    password: { type: String, maxlength: 256, required: true },
    file: String
    // Add other fields as needed
});
let db;
const LoginUser = mongoose.model('log', UserSchema);
mongoose.connect("mongodb://127.0.0.1:27017/nodejs")
    .then(() => {
        db = mongoose.connection; 
        // console.log(db);
        console.log('Connection successfully established');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

    function getDB(){
        return db;
    }
 module.exports = {LoginUser,getDB};