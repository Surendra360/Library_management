const { error } = require("console")
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null, "public/images")
    },
    filename:(req,file,cb)=>{
        const updateName = Date.now() + path.extname(file.originalname)
        cb(null, updateName)
    }
})

const fileFilter = (req, file, cb)=>{
    const filetypes = /jpeg|jpg|png|gif|svg|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test( path.extname(file.originalname).toLowerCase());
    if(mimetype && extname){
        return cb(null, true)
    }else{
        cb("Error: iimages only!")
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter})
module.exports = upload;