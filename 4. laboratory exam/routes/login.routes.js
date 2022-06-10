const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

router.get("/", function (req, res, next) {
  //####################### ZADATAK #######################
  //vrati login stranicu
  res.render("login", {
    linkActive: "login",
    user: req.session.user,
    err: undefined,
  });
  //#######################################################
});

//POSTUPAK PRIJAVE KORISNIKA
router.post("/", async function (req, res, next) {
  //####################### ZADATAK #######################

  //check that the user is registered
  if (req.session.user !== undefined) {
    res.render("login", {
      title: "Log in",
      linkActive: "login",
      user: req.session.user,
      err: "Please log out first.",
    });
    return;
  }

  //check for credentials
  let user = await User.fetchByUsername(req.body.user);
  if (user && user.password == req.body.password) {
    //??????????????????????????????????????
    //if successful, set persistent cookie with username (timeout=1 week)
    let expiryDate = new Date(Number(new Date()) + 604800000);
    res.cookie("appuserID", req.body.user, {
      expires: expiryDate,
      httpOnly: true,
    });
    //??????????????????????????????????????

    //if successful, redirect to the main page and set session user as user that loged in
    req.session.user = user;
    res.redirect("/");
  } else {
    res.render("login", {
      title: "Log in",
      linkActive: "login",
      user: req.session.user,
      err: "Incorrect username or password.",
    });
  }

  //#######################################################
});

module.exports = router;
