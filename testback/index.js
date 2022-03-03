//getting express to your code:
const express = require('express');

//setting the call-function for ready-on-go-usage.
const app = express();

//      From the documents, tobe written again down.
//  app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
//   })


//setting a port to 8000
const port = 8000;

// making a GET request, at  certain thing (here, it is '/') and then we can pass a method which will act on acting on that request. 
// CAUTION: if you're using as arrow function as the method and look for: {} you need to return something, () you donot need to return something. And if the execution is of one line then you can directly write the code instead of using inside {}/().
// here GET Request is expects two parameters. Req (request) and RES (response).
// to send the response use res.send().
app.get('/', (req, res) => {
    return res.send("Hello there, Homepage and My first hands on Express JS");
});

app.get('/login', (req, res) => {
    return res.send("Hello there, This is the login page.");
});

app.get('/signout', (req, res) => {
    return res.send("Hey there, you're signed out. Thanks for joining us on board.") 
});

app.get('/hitesh', (req, res)=> {
    return res.send("Hitesh sir is our course instructor and he uses Instagram.");
});

// now make sure that your request is being listened at some port which your server is going to throw back.
// .listen is used to listen to something. mention the port number further and then a method which will act while listening to that port.
app.listen(port, () => {
    console.log("The app is up and running...");
});

//admin route:
// const admin = function(req, res) {
//     return res.send("This is admin page and it's dashboard written differently.")
// }
const admin = (req, res) => {
    return res.send("This is admin's route and dashboard.")
}
const isLoggedIn = (req, res, next) => {
    console.log("The user is logged in.");
    next();
}
const isAdmin = (req, res, next) => {
    console.log("The user is admin.");
    next();
}
app.get('/admin',isLoggedIn, isAdmin, admin);