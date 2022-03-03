require("dotenv").config();

//bringing mongoose to the starter file.
const mongoose = require('mongoose');

//bringing express
const express = require('express')
const app = express();


//bring the middleware in:
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

        //bringing the routes
//authentication routes
const authRoutes = require("./routes/auth");
//user routes
const userRoutes = require("./routes/user.js");


//connecting mongo db
// mongoose.connect('url to launch', other parameters)
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED!!!!")
}).catch(console.log("Ops! DATABASE IS NOT UP, LOOK FOR THE ERROR!"));

//using middleware:
app.use(express.json())
app.use(cookieParser()); 
app.use(cors());

//using the routes:
app.use("/api", authRoutes)
app.use("/api", userRoutes)


//creating port
const port = process.env.PORT;


//sening our file to listen to that port.
app.listen(port, ()=>{
    console.log(`App is running at port: ${port}`);
});