// potrebno napisati
const express = require("express");
const app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // za post metodu da mozemo hvatat atribute iz post-a

const itemRouter = require("./routes/item.routes");
const homeRouter = require("./routes/home.routes");
const orderRouter = require("./routes/order.routes");
const buyersRouter = require("./routes/buyers.routes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", homeRouter); //home
app.use("/item", itemRouter); //item
app.use("/order", orderRouter); //order
app.use("/buyers", buyersRouter); //buyers

app.listen(3000);
