const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    poster:String,
    bookname:{
        type:String,
        required:[true, "Book name is require"],
        minLength:[4,"Book name must have atleast 4 charecters "],
        trim:true,
        uppercase:true,
        lowercase:true,
        maxLength:[15, message],
        unique:true,
        default:"Book0",
        select:true,
        match:[/regex/, "invalid message"]
    },

    authorname:{
        type:String,
        required:[true, "Author name is required"],
        minLength:[4, "author name must have 4 charecters"],
        trim:true
    },

    isbn:{
        type:String,
        unique:true,
        required:[true, "Book ISBN nuber is requre"],
        minLength:[9, "minimum 10 charecter"],
        maxLength:[9, "maximum 10 charecter"],
        trim:true
    },

    price:{
        type:Number,
        require:[true, "Book prise is required"],
        trim:true,
        default: 0
    },
    description:{
        type:String,
        required:[true, "description of the book is requred"],
        minLength:[10, "minimum 10 charecter is requred for description"],
        default:"This is a most rquired and saling book in 2023, you must reade this book!"
    }
},
{timestamp:true}
)

module.exports = mongoose.model("Book", bookSchema)