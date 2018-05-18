// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var list = {
  selectAll: function(cb) {
    orm.selectAll("list", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("list", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("list", objColVals, condition, function(res) {
      cb(res);
    });
  },
  getCategories: function(column, cb) {
    orm.categories("list", column, (res) => {
      cb(res);
    });
  },
  deleteItem: function (condition, cb) {  
    orm.deleteItem("list", condition, (res) => {
      console.log("bye: "+ condition)
      cb(res);
    })
  },
  searchCategory: function (condition, cb) {  
    orm.searchCategory("list", condition, (res) => {
      cb(res);
    })
  }
  
};

// Export the database functions for the controller (catsController.js).
module.exports = list;
