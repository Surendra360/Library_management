var express = require('express');
var router = express.Router();
const bookModel = require("../models/bookSchema")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post("/register", async (req,res)=>{
 try {
  const newBook = await new bookModel(req.body);
  await newBook.save();
  res.redirect("library")

 } catch (error) {
  console.log(error);
 }
})

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

router.get('/feedback', function(req, res, next) {
  res.render('feedback', { title: 'Feedback' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about' });
});

module.exports = router;
