// potrebno napisati
const express = require("express");
const app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const itemRouter = require("./routes/item.routes");
const homeRouter = require("./routes/home.routes");
const orderRouter = require("./routes/order.routes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", homeRouter); //home
app.use("/item", itemRouter); //item
app.use("/order", orderRouter); //order

app.listen(3000);
