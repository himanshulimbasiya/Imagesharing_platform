/**
 * Created by RAIN on 30-04-2018.
 */

var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var fileUpload= require("express-fileupload");
var mysql = require("mysql");

var port = 8081;
var app = express();

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.set("view engine", "ejs");
app.set("views", "templates");

app.use(session({
    secret: "itsasecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

var con = mysql.createConnection
(
    {
        host: "localhost",
        user: "himanshu",
        password: "himanshu",
        database: "projectdb"
    }
);

con.connect( function(err)
{
    if (err)
    {
        console.log("DATABASE NOT CONNECTED");
    }
    else
    {
        console.log("DATABASE CONNECTED");
    }
});

app.get("/", function(request, response)
{
    var user_name = request.session.username;
    if (request.session.username == user_name)
    {
        var sql = "SELECT username,image,image_id,date,time FROM `user_details`";
        con.query(sql, function (err, results)
        {
            if (err)
            {
                throw err;
            }
            else
            {
                response.render("index.ejs", {"username": request.session.username, "img": results});
            }
        });
    }
    else
    {
        sql = "SELECT username,image,date,time FROM `user_details`";
        con.query(sql, function (err, results)
        {
            if (err)
            {
                throw err;
            }
            else
            {
                response.render("index.ejs", {"username": request.session.username, "img": results});
            }
        });
        response.redirect("/");
    }
});

app.get("/register", function(request, response)
{
    response.render("register.ejs");
});

app.get("/login", function(request, response)
{
    response.render("login.ejs", {"error_check" : null});
});

app.post("/registered", function(request, response)
{
    var firstname = request.body.fname;
    var lastname = request.body.lname;
    var email = request.body.mail;
    var username = request.body.username;
    var password = request.body.password;
    var sql = "INSERT INTO `user_registration` (`firstname`, `lastname`, `email`, `username`, `password`) VALUES ('" + firstname + "','" + lastname + "','" + email + "','" + username + "','" + password + "')";
    con.query(sql, function (err, results)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            console.log("User Registered");
            response.render("login.ejs", {"error_check" : null});
        }
    });
});

app.post("/loggedin", function(request, response)
{
    var user_name = request.body.username;
    var password = request.body.password;
    var sql = "SELECT password FROM `user_registration` WHERE `username` = '"+user_name+"'";

    con.query(sql, function(err, results)
    {
        if (err)
        {
            response.send("Database Connection Error");
        }
        else if (results.length > 0 && results[0].password === password)
        {
            request.session.username=user_name;
            var sql = "SELECT image,date,time FROM `user_details` WHERE `username` = '"+user_name+"'";
            con.query(sql, function (err, results)
            {
                if (err)
                {
                    throw err;
                }
                else
                {
                    response.render("profile.ejs", {"username": request.session.username, "img": results});
                }
            });
        }
        else
        {
            response.render("login.ejs", {"error_check" : "Username and Password doesn't Match"})
        }
    });
});

app.get("/profile", function(request, response)
{
    var user_name = request.session.username;
    if (request.session.username == user_name)
    {
        var sql = "SELECT image,date,time FROM `user_details` WHERE `username` = '"+user_name+"'";
        con.query(sql, function (err, results)
        {
            if (err)
            {
                throw err;
            }
            else
            {
                response.render("profile.ejs", {"username": request.session.username, "img": results});
            }
        });
    }
    else
    {
        response.redirect("/");
    }
});

app.post("/upload", function(request, response)
{
    var user =  request.session.username;
    var file = request.files.uploads;
    var imagename= file.name;
    file.mv("/js/imagesharing/static/uploads/"+file.name);
    var datetime = new Date();
    var date = datetime.toDateString();
    var hours =datetime.getHours();
    var mins =datetime.getMinutes();
    var time= hours+":"+mins;
    var id;
    var sql;
    var sql2 ="SELECT image_id FROM `user_details` WHERE `image_id` = (SELECT MAX(image_id) FROM `user_details`)";
    con.query(sql2, function (err, results)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            id =results[0].image_id;
            id=id+1;
            sql = "INSERT INTO `user_details` (`username`,`image`,`image_id`, `date`, `time`) VALUES ('" + user + "', '" + imagename + "','" + id + "', '" +date+ "','" +time+ "')";
            con.query(sql, function (err)
            {
                if (err)
                {
                    throw err;
                }
                else
                {
                    console.log("IMAGE UPLOADED");
                    var sql = "SELECT image,date,time FROM `user_details` WHERE `username` = '"+user+"'";
                    con.query(sql, function (err, results)
                    {
                        if (err)
                        {
                            throw err;
                        }
                        else
                        {
                            response.render("profile.ejs", {"username": request.session.username, "img": results});
                        }
                    });
                }
            });
        }
    });
});

app.get("/logout", function(request, response)
{
    delete request.session.username;
    response.redirect("/");
});

app.listen(port);
console.log("Server running on http://localhost:"+port);