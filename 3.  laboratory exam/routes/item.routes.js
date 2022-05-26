// potrebno napisati
var express = require("express");
var router = express.Router();
const db = require("../db"); //baza

router.get("/:id([0-9]{1,10})", async function (req, res, next) {
  //id definiran kao regex
  let id = parseInt(req.params.id); // dohvati id iz URI-a
  let query_result = await db.query("SELECT * FROM inventory");
  let items = query_result.rows;
  let the_item; // trazeni proizvod

  for (let item of items) {
    if (item.id === id) {
      the_item = item;
      break;
    }
  }

  if (the_item) {
    query_result = await db.query("SELECT * FROM categories");
    let categories = query_result.rows;
    query_result = await db.query("SELECT * FROM buyers");
    let buyers = query_result.rows;

    buyers = buyers.filter((el) => {
      return el.buyerof == the_item.id;
    });

    let category = categories.find((el) => {
      return el.id == the_item.categoryid;
    });

    res.render("item", {
      linkActive: "Order",
      title: the_item.name,
      product: the_item,
      category: category,
      buyers: buyers,
    });
  } else {
    res.status(404).send("Wrong id?");
  }
});

module.exports = router;
