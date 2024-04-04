const express=require('express');
const nodemailer=require('nodemailer');
const app=express();
require('dotenv').config();
app.set('view engine','hbs');
app.use(express.json());

app.use(express.urlencoded()); 
function generateOtp(){
     otpVal = Math.floor(1000 + Math.random() * 9000);
    console.log(otpVal);
    return otpVal
}

app.get('/', (req, res)=> {
    res.render('otp');
});

app.post('/send',async(req,res)=>{
    otp=generateOtp();
    const recipientEmail = req.body.email;
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: "shagan964@gmail.com",
            pass:process.env.PASS, 
        }
    })
    

    const mail={
        to: recipientEmail,
        from: "shagan964@gmail.com",
        subject:"Hi nodemailer",
        text: `${otp}`,
    }

    try{
        await transporter.sendMail(mail);
        res.send("otp sent successfully :D");
    }
    catch(err){
        res.send("OOPS! otp not sent. Error: ");    
    }
});



app.post('/verify',(req, res)=> {
   
    if (req.body.otp == otp) {
        res.send("You entered correct otp! :)");
    }
    else {
        res.send('otp is incorrect');
    }
});

app.listen(3000,()=>{
    console.log("http://localhost:3000");
})


