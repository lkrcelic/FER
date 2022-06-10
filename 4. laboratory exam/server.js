//uvoz modula
const express = require("express");
const app = express();
const path = require("path");
const pg = require("pg");
const db = require("./db");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const cart = require("./models/CartModel");

//uvoz modula s definiranom funkcionalnosti ruta
const homeRouter = require("./routes/home.routes");
const orderRouter = require("./routes/order.routes");
const loginRoute = require("./routes/login.routes");
const logoutRoute = require("./routes/logout.routes");
const signupRoute = require("./routes/signup.routes");
const cartRoute = require("./routes/cart.routes");
const userRoute = require("./routes/user.routes");
const checkoutRoute = require("./routes/checkout.routes");
//lab4 extra route
const onsiteRoute = require("./routes/on-site.routes");

//middleware - predlošci (ejs)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware - statički resursi
app.use(express.static(path.join(__dirname, "public")));

//middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: true }));

//####################### ZADATAK #######################

//pohrana sjednica u postgres bazu korštenjem connect-pg-simple modula
const pgPool = db.pool; //uzimnanje difinicje pool-a iz db
app.use(
  session({
    store: new pgSession({
      //stvaranje nove sesije
      pool: pgPool,
    }),
    secret: "FER WiM",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 sat je zivotni vijek cookie-a
  })
);

//stvaranje cart-a
app.use((req, res, next) => {
  if (req.session.cart == undefined || req.session.cart.invalid) {
    req.session.cart = cart.createCart();
  }
  next();
});

//#######################################################
console.log(
  "TU SAM *********************************************************************"
);
//definicija ruta
app.use("/", homeRouter);
app.use("/order", orderRouter);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/signup", signupRoute);
app.use("/cart", cartRoute);
app.use("/user", userRoute);
app.use("/checkout", checkoutRoute);
//lab4 extra route
app.use("/on-site", onsiteRoute);

//tu moze doci onaj dio za handlanje erorra ako ne nademo ni jedan path od gore prilikom slanja get zahtjeva

//pokretanje poslužitelja na portu 3000
app.listen(3000);
