const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotEnv=require("dotenv");
dotEnv.config();

const bodyparser=require("body-parser");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({
    useNewUrlParser:true,
    useUnifiedTopology:true,
    extended:true
}));

mongoose.connect(process.env.DATABASE_URL,{

})
.then(()=> console.log("connected to db"))
.catch((err)=>console.log(err));

const rateLimit = require('express-rate-limit');

// If you make more than 10 hits at the referral endpoints it will display the message
//This is tested
const referralLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});


app.use("/api",require("./routes/authRoutes"));
app.use("/api/referral",referralLimiter,require("./routes/referralRoutes"));
app.use("/api/balance",require("./routes/balanceRoutes"));
//app.use("/comments",require("./routes/commentRoutes"));


app.listen(3000,()=> console.log("Server up and running"));

module.exports=app