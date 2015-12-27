/**
 * Created by dongyin on 8/22/15.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1986070@Dong',
    database : 'oppo'
});
module.exports = connection;

/*  connect to cloud
 var connection = mysql.createConnection({
 host : 'us-cdbr-azure-west-c.cloudapp.net',
 user : 'be93d5f3d077f4',
 password : '514fb6cf',
 database : 'donghuyin'
 });

 */