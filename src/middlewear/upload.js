const path = require("path");//(this is the path module which comes with node)

const multer =require("multer");


const storage = multer.diskStorage({
                          //req multer requeste
                          //filr multer file
                          //then a callback function
    destination: function (req, file, callback) {//call back takes two things err and destination (wherre you want to store the files) here the err is null;
        callback(null, path.join(__dirname,"../uploads"))
    },


    filename: function (req, file, callback) {

      //
      const uniqueSuffix = Date.now() ;
      callback(null,uniqueSuffix+ '-' +  file.originalname )
    }
  });


  const fileFilter= (req, file, callback)=> {

    // console.log({file});
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
   
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" ){
       // To accept the file pass `true`, like so:
    callback(null, true)
    } else{
    // To reject this file pass `false`, like so:
    callback(new Error('I don\'t have a clue!'), false)
  
    }
  
    // You can always pass an error if something goes wrong:
    // allcackb(new Error('I don\'t have a clue!'))
  
  }


const options={
    storage,
    fileFilter,
    limits:{
        fileSize:1024*1024*5,
    }
}

const uploads = multer(options);

const uploadedfiles =(formkey,method)=>{

  return function (req,res,next){

    let uploadedItem;
    if(method==="single"){
      uploadedItem=uploads.single(formkey);
    }else if(method=="multiple"){
      uploadedItem=uploads.any(formkey);
    }
    

      return uploadedItem(req, res, function (err) 
        {

          if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.

            return res.status(500).send({message:err.message})
          } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(501).send({message:err.message})
          }
      
          // Everything went fine.
          return next();
        })
      
  }
}

module.exports={uploadedfiles};





