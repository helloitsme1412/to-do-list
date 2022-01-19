//jshint esversion:6

const express = require("express");

var items =["Hello"];
var workitems = [];

const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);
 
    res.render("list", {listtitle:day, newlistitem:items})

});

app.post("/", function(req, res){
    let item = req.body.NewItem;
    if(req.body.list === "Work List"){
        workitems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res){
    res.render("list", {listtitle:"Work List", newlistitem:workitems});

});

app.post("/work", function(req,res){
    let item = req.body.NewItem;
    workitems.push(item);
    res.redirect("/work");
});
app.listen(3000, function(){
    console.log("Server started at port 3000");
});