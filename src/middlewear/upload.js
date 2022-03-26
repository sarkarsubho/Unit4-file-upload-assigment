const path = require("path");

const multer =require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '__dirname')
    },
    filename: function (req, file, callback) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })


const options={
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5,
    }
}

const uploads = multer(options);
module.exports=uploads;





