// potrebno napisati
const db = require("../db"); //dodaj bazu podataka
var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
  let categories, inventory, result;
  // treba dohvatiti categories
  query_result = await db.query("SELECT * FROM categories");
  categories = query_result.rows;
  // treba dohvatiti inventory
  query_result = await db.query("SELECT * FROM inventory");
  inventory = query_result.rows;

  res.render("order", {
    linkActive: "Order",
    title: "Order",
    categories: categories,
    inventory: inventory,
  });
});

module.exports = router;
