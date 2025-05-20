var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var middleware = require("../middleware");


//show index route
router.get("/",function(req,res){
    Book.find({}, function(err,allBooks){
        if(err){
            console.log(err);
        }else{
            res.render("books/index",{books:allBooks,currentUser:req.user});
        }
    });

});

//create Library - add new book to db
router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image  =  req.body.image;
    var description = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newBook = {name:name ,price:price, image:image,description:description,author:author}
    Book.create(newBook, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/book");
        }
    });
});

//show  form to create new Library
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("books/new.ejs");
})


//show more info about a book
router.get("/:id",function(req,res){
    Book.findById(req.params.id).populate('comments').exec(function(err,foundBook){
        if(err){
            console.log(err);
        }else{
            res.render("books/show",{book: foundBook});
        }
    });
});

router.get("/:id/edit",middleware.checkBookOwnership, function(req,res){
        Book.findById(req.params.id,function(err,foundBook){
            res.render("books/edit",{book:foundBook});
        });
});

router.put("/:id",middleware.checkBookOwnership,function(req,res){
    Book.findByIdAndUpdate(req.params.id,req.body.book,function(err,updatedBook){
        if(err){
            res.redirect("/book");
        }else{
            res.redirect("/book/" + req.params.id);
        }
    })
})

router.delete("/:id",middleware.checkBookOwnership,function(req,res){
        Book.findByIdAndDelete(req.params.id,function(err){
            if(err){
                res.redirect("/book")
            }else{
                res.redirect("/book")
            }
        })
})

//middleware


module.exports = router;