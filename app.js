var express = require("express");
var app= express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Book = require("./models/book");
var methodOverride = require("method-override")
var seedDB = require("./seed");
var Comment = require("./models/comment");
var flash = require("connect-flash");

////  routes !!!!!!////=================
var commentRoutes = require("./routes/comment");
var bookRoutes = require("./routes/book");
var indexRoutes = require("./routes/index");
// ====================================//
//======= Login concept==========//
var passport = require("passport");
var LocalStrategy  = require("passport-local")
var User = require("./models/user")
//====================================//
app.use(require("express-session")({
    secret:"Rusty is the best and cutest dog!",
    resave:false,
    saveUninitialized :false
}));
app.use(methodOverride("_method"))
app.use(flash());
// seedDB();

mongoose.connect('mongodb://localhost:27017/neww',{ useNewUrlParser: true });

// mongoose.connect("mongodb+srv://Ash123:BVFNKSat5jodGiyB@cluster0.qpwj7ag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true })

// mongoose.connect("mongodb+srv://abc:abc@cluster0.qxbrkjt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
// mongoose.connect("mong odb+srv://ashirwadkrchopra:Mongodb@123@cluster0.mongodb.net/@ashirwad.bvq77.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true}); 
//  mongodb+srv://ashirwadkrchopra:<db_password>@ashirwad.bvq77.mongodb.net/  
// {useNewUrlParser: true}

// mongoose.connect("mongodb+srv://amarsingh200021:amarsingh200021@devment-4htbk.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

//============= login ===========//
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//==========================//

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get("/",function(req,res){
    res.render("books/home");
})

app.use("/",indexRoutes);
app.use("/book",bookRoutes);
app.use("/book/:id/comments",commentRoutes);


// app.listen(process.env.PORT);
// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3301;
// }
// app.listen(port;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




