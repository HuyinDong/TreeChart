
var data = require('../controllers/data.server.controller');
module.exports = function(app){
    console.log("route");
    app.get('/', function (req, res) {
        res.render('index', {});
    });
    app.get('/data/exploit',data.getExploit);
    app.get('/data/refs', data.getRefs);
    app.get('/data/tools',data.getTools);
    app.get('/data/virus',data.getVirus);
    app.get('/data/vuln',data.getVuln);

    app.get('/data/vuln/:vendor',data.selectOne);
    app.get('/data/vuln/:vendor/:product',data.selectProducts);



};