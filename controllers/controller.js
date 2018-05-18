var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var list = require("../models/list.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  list.selectAll(function(data) {
    var categories = [];

    var hbsObject = {
      list: data,
      cats: categories
    };
    data.forEach(item => {
      if((categories.map(function(e) { return e.cat; }).indexOf(item.category) === -1) && (item.category !== null) && (item.category.length > 0)) 
      // console.log("hi: "+item.category)
        categories.push({cat: item.category})
      // console.log(item.category)
    })
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/list", function(req, res) {
  list.create(["item_name", "category","done"], [req.body.item_name, req.body.category, req.body.done], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/list/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  list.updateOne(
    {
      done: req.body.done
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

router.get("/category/:cat", function(req, res) {
  var condition = "category = '" + req.params.cat+"'";

  console.log("condition", condition);

  list.searchCategory(
    // {cat: req.body},
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }

    var hbsObject = {
      list: result
    };
    
      res.render("category", hbsObject);
    }
  );
});

router.delete("/api/list/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  list.deleteItem(
    condition,
    function(result) {
      // if (result.changedRows === 0) {
      //   // If no rows were changed, then the ID must not exist, so 404
      //   return res.status(404).end();
      // }
      res.status(200).end();

    }
  );
});
// router.get("/", (req, res) => {
//   list.categories(
//     function(data) {
//       var categories = {
//         categories: data
//       }
//       res.render("index", categories);
//     }
//   )
// })

// Export routes for server.js to use.
module.exports = router;
