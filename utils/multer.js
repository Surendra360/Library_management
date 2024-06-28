const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null, "public/images")
    },
    filename:(req,file,cb)=>{
        const modifiledFilename = Date.now() + path.extname(file.originalname)
        cb(null, modifiledFilename)
    }
})

const upload = multer({storage: storage })
module.exports = upload;