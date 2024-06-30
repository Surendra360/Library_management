
const nodemailer = require("nodemailer");
exports.sendMail = (req,res)=>{
    const tranport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "surendrakeerbaniya@gmail.com",
            pass: "ntlkpxkxqqxrvzyh"
        },
    })

    const mailOptions = {
        from: "surendrakeerbaniya@gmail.com",
        to: req.body.gmail,
        subject: "BookStore Subscriptin",
        html: `<h1>Wellcome to bookStore</h1>
        <p>this is regarding for subscription our page</p>` 
    }
    console.log(mailOptions.to);

    tranport.sendMail(mailOptions, (err,info)=>{
        if(err){
            return res.send(err);
        }
        console.log(info);
        return res.send("<h1 style='text-align:center;color: tomato; margin-top:10%'><span style='font-size:60px;'>✔️</span> <br />Email Sent! Check your inbox , <br/>check spam in case not found in inbox.</h1><a href='/'>HomePage</a>")
    })
}