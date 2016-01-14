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

function handleDisconnect() {
    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();