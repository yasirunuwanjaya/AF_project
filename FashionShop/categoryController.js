var mongoose = require("../mongoose.config");
var CategorySchema = mongoose.model("Category");

var CategoryController = function () {
    this.add = function (categoryInstance) {
        return new Promise((resolve, reject) => {
            var Category = new CategorySchema({
                categoryName: categoryInstance.categoryName,
                categoryDesc: categoryInstance.categoryDesc
            });
            Category.save()
                .then(() => {
                    resolve({ status: 200, message: "Category Added" });
                })
                .catch(err => {
                    reject({ status: 404, message: "err:-" + err });
                });
        });
    };

    this.getAll = function () {
        return new Promise((resolve, reject) => {
            CategorySchema.find()
                .exec()
                .then(data => {
                    resolve({ status: 200, message: "Gell All Categories", data: data });
                })
                .catch(err => {
                    reject({ status: 404, message: "err:-" + err });
                });
        });
    };

    this.getSingle = function (id) {
        return new Promise((resolve, reject) => {
            CategorySchema.find({ _id: id })
                .exec()
                .then(data => {
                    resolve({ status: 200, message: "get single category", data: data });
                })
                .catch(err => {
                    reject({ status: 404, message: "err:-" + err });
                });
        });
    };

    this.update = function (id, updateData) {
        return new Promise((resolve, reject) => {
            CategorySchema.update({ _id: id }, updateData)
                .then(() => {
                    resolve({ status: 200, message: "update category" });
                })
                .catch(err => {
                    reject({ status: 404, message: "err:-" + err });
                });
        });
    };

    this.updateSet = function (updateData) {
        return new Promise((resolve, reject) => {
            CategorySchema.updateMany(updateData)
                .then(() => {
                    resolve({ status: 200, message: "update category set" });
                })
                .catch(err => {
                    reject({ status: 404, message: "err:-" + err });
                });
        });
    };

    this.delete = function (id) {
        return new Promise((resolve, reject) => {
            CategorySchema.remove({ _id: id })
                .then(() => {
                    resolve({ status: 200, message: "delete category" });
                })
                .catch(err => {
                    reject({ status: 404, message: "err:-" + err });
                });
        });
    };

    this.deleteSet = function (id) {
        return new Promise((resolve, reject) => {
            CategorySchema.remove({ cateStatus: id })
                .then(() => {
                    resolve({ status: 200, message: "delete category set" });
                })
                .catch(err => {
                    reject({ status: 404, message: "err:-" + err });
                });
        });
    };
};

module.exports = new CategoryController();
