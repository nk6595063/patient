
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`);
}
});
    const upload = multer({
        storage: storage,
        limits: {
            maxSize: 10000
        },
        fileFilter: function(req, file, cb) {
            const filetypes = /png|jpeg|pdf|jpg/;
            const mimetype = filetypes.test(file.mimetype);
            // console.log(mimetype);
            const extname= filetypes.test(path.extname(file.originalname).toLowerCase());
            if (mimetype && extname) {
                cb(null, true);
            } else {
                cb('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
            }
        }
    }).single('filename');

 module.exports = upload;