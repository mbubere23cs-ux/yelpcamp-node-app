//Using different environments
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var seedDB = require("./seeds");

//Requiring the Campground db model
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

//Setting mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://localhost/yelp_camp");
//DATABASEURL for testing on goorm is set to "mongodb://localhost/yelp_camp"
//DATABASEURL for hosting on heroku is set to mongodb+srv://Zainab:atlasdb@yelpcampcluster.t8hp0.mongodb.net/YelpcampCluster?retryWrites=true&w=majority
//mongoose.connect("mongodb+srv://Zainab:atlasdb@yelpcampcluster.t8hp0.mongodb.net/YelpcampCluster?retryWrites=true&w=majority");


//Setting bodyparser and ejs
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); //Seed the database

//Passport Configuration
app.use(require("express-session")({
	secret: "What doesn't kill you, teaches you to fake smile.",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//app.listen(4000, function(){
//	console.log("YelpCamp server has started!");

if (require.main === module) {
    app.listen(4000, function(){
        console.log("YelpCamp server has started!");
    });
}

module.exports = app;

 

 
