const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    itemName: {
        type: String,
        require: true
    },
    catId: {
        type: String,
        require: true
    },
    itemDesc: {
        type: String,
        require: false
    },
    itemPrice: {
        type: String,
        require: false
    },
    itemDiscount: {
        type: String,
        require: false
    },
    isItemDiscount: {
        type: Boolean,
        require: false
    }

});

const CategorySchema = new Schema({
    categoryName: {
        type: String,
        require: true
    },
    categoryDesc: {
        type: String,
        require: true
    }
});

mongoose.model('Item', ItemSchema);
mongoose.model('Category', CategorySchema);

const uri = `mongodb+srv://fashionshop-admin:fashionshop-admin@fashion-store-cluster-gsh3o.mongodb.net/Fashion_Shop?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to the MongoDB');
});

module.exports = mongoose;