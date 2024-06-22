const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0/Book_Store")
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e.message);
  });
