/**
 * Created by dongyin on 8/22/15.
 */
var mysql = require('mysql');

var connection = initializeConnection({
    host : 'localhost',
    user : 'root',
    password : '1986070@Dong',
    database : 'oppo'
});


function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    var connection = mysql.createConnection(config);

    // Add handlers.
    addDisconnectHandler(connection);

    connection.connect();
    return connection;
}


module.exports = connection;