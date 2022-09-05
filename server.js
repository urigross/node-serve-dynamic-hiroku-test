const express = require("express"); 
const app = express();

app.use(express.static("public")) // Serve Static files from "public" folder.
app.use(express.urlencoded({extended: true})); // Allows us to access info from forms
app.use(express.json())  // Deal with JSON information from the body Like fetch from the client or calling API

app.set("view engine","ejs");// pass the view engine that we installed by npm o ejs
//app.use(logger); // Use logger function to run it globally.

// Dynamic pass params to page:
// app.get('/', logger, (req, res)=>{  // First param logger is a middleware that runs only on this local block, First param between () is the path, 2nd is a request, 3rd is next function 99% of the times not important
//     console.log('Client Has seen website');  //  log a msg server as client seen site
//    // res.download("server.js");  // Download a file
//     // res.send("Hi"); // Send a Message on DOM to client
//     // res.json({ message: "Error", MessageTxt: res.statusCode});  // Send error code
//     res.render("index", {text: "World"});  // Default is that all of the files are living in "views" folder, 
//                                              //2nd param we pass info from the
//     // server to the views
// })

const userRouter = require("./routes/users");

app.use('/users', userRouter);

// Middlewares
function logger(req, res, next){
    console.log(req.originalUrl);
    next();
}


//app.listen(3000);
app.listen(process.env.PORT || 3000); // For heroku & localhost
//app.listen(3000); // For local host
 console.log('Open browser at localhost:3000');

