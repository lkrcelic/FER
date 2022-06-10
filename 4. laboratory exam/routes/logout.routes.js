const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  //####################### ZADATAK #######################
  req.session.user = undefined;
  req.session.cart = undefined; // - obrisati sadržaj košarice

  req.session.destroy(); // odjava od sesije

  res.redirect("/"); // - napraviti redirect na osnovnu stranicu

  //#######################################################
});

module.exports = router;
