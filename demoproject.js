// Load express and path
var express = require("express");
var path = require("path");

// Use node js web application framework
var app = express();
app.set("port", process.env.PORT || 3000);

// set up routes
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

// set views and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// listen on port 3000
app.listen(app.get("port"), function(){
  console.log("Server started on port " + app.get("port"));
})
