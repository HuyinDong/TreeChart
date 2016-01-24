
var data = require('../controllers/data.server.controller');
module.exports = function(app){
    app.get('/', function (req, res) {
        res.render('index', {});
    });

    /****************************cve********************************/
    app.get('/data/cves',data.getCVEs);


    /*******************table and tree chart************************/
    app.get('/data/vendor/like/:likeVendorName',data.getVendor);
    app.get('/data/vendor/:vendor',data.getProductFromVendor);
    app.get('/data/vendor/:vendor/:product',data.getProductVersionNumber);
    app.get('/data/vendor/table/:vendor/:product/:version',data.getTableProducts);

    app.get('/data/vendor/tree/like/:vendor/:product/:version',data.getLikeProducts);
    app.get('/data/vendor/tree/:vendor/:product/:version',data.getExactProducts);
    app.get('/data/vendor/tree/:vendor/:product/:version/:edition',data.getCveNum);

    app.get('/data/smartexploits/:cve',data.getSmartExploits);
};