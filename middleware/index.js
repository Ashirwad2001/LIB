var middlewareObj = {};
var Book = require("../models/book");
var Comment = require("../models/comment");
middlewareObj.checkBookOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Book.findById(req.params.id,function(err,foundCar){
            if(err){
                req.flash("error","book not found")
                res.redirect("back")
            }else{
                if(foundbook.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error","You need to be logged in to do that")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                req.flash("error","book not found")
                res.redirect("back")
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that")
                    res.redirect("back")
                }
            }
        })
    }else{
        req.flash("error","You need to be logged in to do that")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be LogIn to do that");
    res.redirect("/login");
}

middlewareObj.check

module.exports = middlewareObj;