// potrebno napisati
const db = require("../db"); //dodaj bazu podataka
var express = require("express");
var router = express.Router();
const { check, body, validationResult } = require("express-validator");

router.get("/", async function (req, res, next) {
  let buyers, query_result;
  // treba dohvatiti partnere
  query_result = await db.query("SELECT * FROM buyers");
  buyers = query_result.rows;

  res.render("buyers", {
    linkActive: "Partners",
    title: "Partners",
    buyers: buyers,
  });
});

router.get("/update-buyer/:id([0-9]{1,10})", async function (req, res, next) {
  let products, query_result, buyer;
  let id = parseInt(req.params.id); // dohvati id iz URI-a

  // treba dohvatiti buyere
  query_result = await db.query("SELECT * FROM inventory");
  products = query_result.rows;

  query_result = await db.query("SELECT * FROM buyers");
  buyer = query_result.rows.find((el) => {
    return el.id == id;
  });

  let modal = {
    name: "product_list",
    id: "product_list",
    list: products,
  };

  res.locals.selectData = modal;

  res.render("update-buyer", {
    linkActive: "Buyers", //za boldanje linka
    title: "Update buyer", //naslov za tab u chromu
    buyer: buyer,
    itemID: buyer.buyerof,
  });
});

router.post(
  "/update-buyer/:id([0-9]{1,10})",
  [
    body("buyername").trim().isLength({
      min: 1,
      max: 17,
    }),
    body("buyersurname").trim().isLength({
      min: 1,
      max: 17,
    }),
    body("country").trim().isLength({
      min: 1,
      max: 19,
    }),
    body("email").trim().isEmail(),
    body("buyersince")
      .trim()
      .isInt({
        min: 1909,
        max: 2022,
      })
      .toInt(),
    body("product_list").trim().notEmpty(),
  ],
  async function (req, res, next) {
    let errors = validationResult(req);
    let id = parseInt(req.params.id); // dohvati id iz URI-a

    if (errors.isEmpty()) {
      try {
        await db.query(
          "update buyers set name = $1, surname = $2, country = $3, email = $4, buyerSince = $5, buyerOf = $6 where id = $7",
          [
            req.body.buyername,
            req.body.buyersurname,
            req.body.country,
            req.body.email,
            req.body.buyersince,
            req.body.product_list,
            id,
          ]
        );

        res.redirect(`/item/${req.body.product_list}`);
      } catch (error) {
        console.log(
          "::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
        );
        res.render("error", {
          title: "Update buyer",
          linkActive: "Buyers",
          errDB: error.message,
          errors: errors.array(),
          itemID: id,
        });
      }
    } else {
      res.render("error", {
        title: "Update buyer",
        linkActive: "Buyers",
        errors: errors.array(),
        itemID: id,
      });
    }
  }
);

module.exports = router;
