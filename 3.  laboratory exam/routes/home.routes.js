// potrebno napisati
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("home", {
    linkActive: "Home", //za boldanje linka
    title: "Home", //naslov za tab u chromu
  });
});

module.exports = router;
