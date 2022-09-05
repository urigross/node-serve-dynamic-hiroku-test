const express = require("express"); 
const router = express.Router();

//router.use(logger2) // Middleware that invokes every routing

router.get('/', (req, res) =>{
    //req.query.name / Get data from query params like localhost:3000//users?name=Kyle
    res.send('User List');
})

router.get('/new', (req, res) =>{
   res.render("users/new", { firstName: "Test"}) // Initial value to start with "Test" but this is optional 
   res.send('hi');
   //  you can do this res.render("users/new")
    // res.send('User new form');

})

router.post('/',(req, res)=>{
    const isValid = false;
    if(isValid) {
        users.push({firstName: req.body.firstName});
        res.redirect(`/users/${users.length -1 }`); // Redirecting to user's page.
    }
    else{
        console.log('Error');
        res.render('users/new', { firstName: req.body.firstName});  // Renders the page again with firstr name parameter
    }
   // console.log(req.body.firstName); // - Express not allowing to ented body params. You will need a middleware: apply to server.js app.use.apply(express.urlencoded({extended: true}));
    //res.send('Hi');// send a message to DOM
})

// Always the dynamic route is the lowest!
router.route('/:id')
.get((req, res)=>{
    res.send(`User ${req.user.firstName} get ID: ${req.params.id}`); 
    console.log(req.user)  // Print the user that we created on the middleware router.param
})
.put((req, res)=>{
    
    res.send(`Update User with id: ${req.params.id}`);
})
.delete((req, res)=>{
    
    res.send(`Delete User with id: ${req.params.id}`);
})

// Middlewares - Are always takes req,res,next params
const users = [{name: 'Kylie'},{name:'Sally'}];

function logger2(req, res, next){
    console.log(req.originalUrl);
    next();
}

router.param("id", (req, res, next, id)=>{  // Whenever you run a function with an ID param in it - run this function also.
    // Next is a middleware. What is a middleware? It's a program that runs between a request and response
    req.user = users[id];  // Get the user with the index number that matches the id
    next(); // This will go to the next step so this program will not be stuck in an infinite loop
})
module.exports = router