exports.checkPrice = (req,res,next)=>{
    if(req.body.price <500){
      res.send("Price is too low plese check it");
    } else{
      next();
    }
  }