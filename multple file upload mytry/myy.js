const express  = require('express');
const path = require('path');
const mysql = require('mysql');
const multer = require('multer');

const app=express();

app.set('view',path.join(__dirname,"views"));

const connection = mysql.createConnection({
    host:'localhost',
    user :'root',
    password : 'root123',
    database :'multifile'
});

connection.connect((err)=>{
    if(err){
        throw err;
}
  console.log('connection successfully');
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname +'-' + Date.now() + path.extname(file.originalname));
}
});

const upload =multer({
    storage:storage,
    limits:{
        maxSize:10000
    },
    fileFilter:function(req,file,cb){
        const filetypes =/png|jpeg|pdf|jpg/;
        const mimetype = filetypes.test(file.mimetype);
        if(mimetype){
            cb(null,true);
        }
        else 
        {
            cb('error filefilter');
        }
      
    }
}).array('multer',5);

app.post('/uploads', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.error("Error uploading files: " + err);
            return res.status(400).json({ error: err.message });
        }
        const filenames = req.files.map(file => file.filename);

        connection.query('INSERT INTO mult (photo) VALUES  (?)', [filenames].join(','), (err, result) => {
            if (err) {
                console.error("Error inserting into database: " + err);
                return res.status(500).send("Error inserting into database");
            }
            console.log("Files inserted into database successfully");
            res.send("success");
        });
    });
});


