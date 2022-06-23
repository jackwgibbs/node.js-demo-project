var express = require("express");
var path = require("path");

var app = express();

app.set("port", process.env.PORT || 3000);

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.listen(app.get("port"), function(){
  console.log("server started on port " + app.get("port"));

})
