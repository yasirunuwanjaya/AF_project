var mongoose = require("../mongoose.config");
var ItemSchema = mongoose.model("Item");

var ItemController = function () {
  this.add = function (itemInstance) {
    return new Promise((resolve, reject) => {
      var Item = new ItemSchema({
        itemName: itemInstance.itemName,
        catId: itemInstance.catId,
        itemDesc: itemInstance.itemDesc,
        itemPrice: itemInstance.itemPrice,
        itemDiscount: itemInstance.itemDiscount,
        isItemDiscount: itemInstance.isItemDiscount
      });
      Item.save()
        .then(() => {
          resolve({ status: 200, message: "Item Added" });
        })
        .catch(err => {
          reject({ status: 404, message: "err:-" + err });
        });
    });
  };

  this.getAll = function () {
    return new Promise((resolve, reject) => {
      ItemSchema.find()
        .exec()
        .then(data => {
          resolve({ status: 200, message: "Gell All Items", data: data });
        })
        .catch(err => {
          reject({ status: 404, message: "err:-" + err });
        });
    });
  };

  this.getSingle = function (id) {
    return new Promise((resolve, reject) => {
      ItemSchema.find({ catId: id })
        .exec()
        .then(data => {
          resolve({ status: 200, message: "get single item", data: data });
        })
        .catch(err => {
          reject({ status: 404, message: "err:-" + err });
        });
    });
  };

  this.update = function (id, updateData) {
    return new Promise((resolve, reject) => {
      ItemSchema.update({ _id: id }, updateData)
        .then(() => {
          resolve({ status: 200, message: "update item" });
        })
        .catch(err => {
          reject({ status: 404, message: "err:-" + err });
        });
    });
  };

  this.updateSet = function (updateData) {
    return new Promise((resolve, reject) => {
      ItemSchema.updateMany(updateData)
        .then(() => {
          resolve({ status: 200, message: "update item set" });
        })
        .catch(err => {
          reject({ status: 404, message: "err:-" + err });
        });
    });
  };

  this.delete = function (id) {
    return new Promise((resolve, reject) => {
      ItemSchema.remove({ _id: id })
        .then(() => {
          resolve({ status: 200, message: "delete item" });
        })
        .catch(err => {
          reject({ status: 404, message: "err:-" + err });
        });
    });
  };

  this.deleteSet = function (id) {
    return new Promise((resolve, reject) => {
      ItemSchema.remove({ catId: id })
        .then(() => {
          resolve({ status: 200, message: "delete item set" });
        })
        .catch(err => {
          reject({ status: 404, message: "err:-" + err });
        });
    });
  };
};

module.exports = new ItemController();
