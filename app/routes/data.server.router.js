
var data = require('../controllers/data.server.controller');
module.exports = function(app){
    app.get('/', function (req, res) {
        res.render('index', {});
    });
    app.get('/data/exploit',data.getExploit);
    app.get('/data/refs', data.getRefs);
    app.get('/data/tools',data.getTools);
    app.get('/data/virus',data.getVirus);
    app.get('/data/vuln',data.getVuln);
    app.get('/data/vendor/:ven',data.getVendor);
    app.get('/data/vuln/:vendor',data.selectOne);
    app.get('/data/vuln/version/:vendor/:product',data.getVulnVersionNum);
    app.get('/data/vuln/:vendor/:product/:version',data.selectProducts);
    app.get('/data/vuln1/:vendor/:product/:exactVersion',data.getEdition);
    app.get('/data/vuln1/:vendor/:product/:exactVersion/:cveNum',data.getCveNum);

};