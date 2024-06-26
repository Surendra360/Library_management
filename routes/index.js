var express = require('express');
var router = express.Router();

const path = require("path")
const fs =require("fs")
const bookModel = require("../models/bookSchema")

const{checkPrice} = require("../utils/middlewares"); // import the check price middleware
// const upload = require('../utils/multer').single("poster");
const upload = require('../utils/multer');

const {sendMail} = require("../utils/sendMail")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post("/sendmail", (req,res,next)=>{
  sendMail(req,res);
})

router.get('/register', function(req, res, next) {
  res.render('register');
});

// router.post("/register", checkPrice, async (req,res)=>{
//  try {
//   const newBook = await new bookModel(req.body);
//   await newBook.save();
//   res.redirect("library")

//  } catch (error) {
//   console.log(error);
//  }
// })

// updating thise post register route ---------->

// router.post("/register", upload.single("poster"), checkPrice, async (req,res,next)=>{
//   try {
//     const newBook = await new bookModel({...req.body, poster: req.file.filename})
//     await newBook.save()
//   res.redirect("/library")
//   } catch (error) {
//     res.send(error)
//   }
// })

// ----------------------------->

// router.post("/register", checkPrice, async (req,res,next)=>{
//   upload(req,res, async (err)=>{
//     if(err){
//       console.log(err);
//       res.json(err)
//     }else{
//       try {
//         const newBook = await new bookModel({...req.body, poster: req.file.filename})
//         await newBook.save()
//         res.redirect("/library")
        
//       } catch (error) {
//         console.log(error);
//         res.send(error)
//       }
//     }
//   })
// })


router.post("/register", upload.single("poster"), checkPrice, async (req, res,next)=>{
  try {
    const newBook = await new bookModel({...req.body, poster: req.file.filename})
    await newBook.save();
    res.redirect("/library")
    
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})


//function tranfer into utils-> middlewares and requre in thise folder------------->

// function checkPrice(req,res,next){
//   if(req.body.price <500){
//     res.send("Pris is too low plese check it");
//   } else{
//     next();
//   }
// }

router.get('/library', async function(req, res, next) {
  try {
    const books = await bookModel.find() 
    res.render('library',{books: books});
  } catch (error) {
    console.log(error);
  }
});

router.get("/edit/:id", async (req,res,next)=>{
  try {
    const book = await bookModel.findById(req.params.id);
    res.render("edit",{book: book});
  } catch (error) {
    console.log(error);
  }
})

router.post("/update/:id", async (req,res,next)=>{
  try {
    await bookModel.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/library")
  } catch (error) {
    console.log(error);
  }
})

// router.get("/delete/:id", async (req,res,next)=>{
//   try {
//     await bookModel.findByIdAndDelete(req.params.id);
//     res.redirect("/library")
//   } catch (error) {
//     console.log(error);
//   }
// })

//deleting the images stored in file

router.get("/delete/:id", async (req,res,next)=>{
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id)
    fs.unlinkSync(path.join(__dirname, `../public/images/${book.poster}`))
    res.redirect("/library")
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})

router.get('/feedback', function(req, res, next) {
  res.render('feedback');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
