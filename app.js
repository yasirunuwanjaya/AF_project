var Express = require('express');
var bodyParser = require('body-parser');
var Cors = require('cors');
var ItemRoute = require('./FashionShop/itemRoute')
var CategoryRoute = require('./FashionShop/categoryRoute')
const PORT = process.env.PORT || 5000

var app = Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/item', ItemRoute);
app.use('/category', CategoryRoute);

app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
        process.exit(-1);
    }

    console.log(`Server listen on port ${PORT}`)
})