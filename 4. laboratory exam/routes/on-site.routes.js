const express = require("express");
const router = express.Router();
const Helper = require("./helpers/helper");

router.get("/", function (req, res, next) {
  res.render("view", {
    title: "Newsletter subscription",
    linkActive: "cart",
    user: req.session.user,
    helper: new Helper(req.session.params),
  });
});

router.post("/save", function (req, res, next) {
  if (!req.session.params) {
    //if no session params create them
    req.session.params = {};
  }

  if (req.body.newsletters) {
    req.session.params.newsletters = req.body.newsletters;
  }

  if (req.body.email) {
    req.session.params.email = req.body.email;
  }

  if (req.body.statements) {
    console.log("USO");
    let arr = [];
    if (typeof req.body.statements == "string") {
      arr.push(req.body.statements);
    } else {
      for (let y of req.body.statements) arr.push(y);
    }

    req.session.params.statements = [
      { statement: "I accept the terms and conditions", checked: false },
      { statement: "I have read the privacy policy", checked: false },
    ];
    for (let x of req.session.params.statements) {
      if (arr.includes(x.statement)) x.checked = true;
      else x.checked = false;
    }
    //console.log(req.session.params.statements);
  }

  res.redirect("/cart");
});

//Reset delets session param but stays at the site
router.post("/reset", function (req, res, next) {
  req.session.params = undefined;

  res.redirect("/on-site");
});

//done as before on the lab4 prep
router.post("/order", function (req, res, next) {
  res.redirect("/checkout");
});

module.exports = router;
