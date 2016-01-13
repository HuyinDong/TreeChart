/**
 * Created by dongyin on 8/22/15.
 */


var connection = require('../../config/mysql');
var mysql = require('mysql');
var fs = require('fs');
exports.getExploit = function(req,res,next){
    call(connection,'select * from exploitdb', req,res,next);
};

exports.getRefs = function(req,res,next){
    call(connection,'select * from refs', req,res,next);
};

exports.getTools = function(req,res,next){
    call(connection,'select * from tools',req,res,next);
};

exports.getVirus = function(req,res,next){
    call(connection,'select * from virus_info',req,res,next);
};

exports.getVendor = function(req,res,next){
    call(connection,"select distinct(vendor) from vuln_soft where `vendor` LIKE '%"+req.params["ven"]+"%'",req,res,next);
}

exports.getVuln = function(req,res,next){
    call(connection,'select * from vuln_soft',req,res,next);
};

exports.getVulnVersionNum = function(req,res,next){
    call(connection,"select distinct(vers_num) from vuln_soft where `vendor` ='"+req.params['vendor']+"' and " +
        "`prod_name` = '"+req.params['product']+"'",req,res,next);
};

exports.getEdition = function(req,res,next){
    console.log("edition");
    var edtion = req.params['exactVersion'] == "empty"?"":req.params['exactVersion'];
    call(connection,"select distinct(edition) from vuln_soft where `vendor` ='"+req.params['vendor']+"' and " +
        "`prod_name` = '"+req.params['product']+"' and "+"`vers_num` = '"+
        edtion+"'",req,res,next);
};

exports.getCveNum = function(req,res,next){
    var edtion = req.params['exactVersion'] == "empty"?"":req.params['exactVersion'];
    call(connection,"select vname from vuln_soft where `vendor` ='"+req.params['vendor']+"' and " +
        "`prod_name` = '"+req.params['product']+"' and "+"`vers_num` = '"+
        edtion+"' and "+"`edition` ='"+req.params['cveNum']+"'",req,res,next);
};

exports.selectOne = function(req,res,next){
    var sql = 'select distinct(prod_name) from vuln_soft where vendor = ?';
    var inserts = [req.params["vendor"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};


exports.selectProducts = function(req,res,next){
    console.log("product");
    var ver;
    if(req.params['version'] == 'empty'){
        ver = "%%"
    }else{
        ver = "%"+req.params['version']+"%";
    }
    var sql = 'select distinct(vers_num) from vuln_soft where vendor = ? and prod_name = ? and `vers_num` LIKE ?';
    var inserts = [req.params["vendor"],req.params["product"],ver];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};


exports.getTableProducts = function(req,res,next){
    console.log("tableProducts");
    var ver;
    if(req.params['version'] == 'empty'){
        ver = "%%"
    }else{
        ver = "%"+req.params['version']+"%";
    }
    var sql = 'select * from vuln_soft where vendor = ? and prod_name = ? and `vers_num` LIKE ?';
    var inserts = [req.params["vendor"],req.params["product"],ver];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
}

exports.selectAll = function(req,res,next){
    var sql = 'select * from ??';
    var inserts = [req.params["table"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

exports.getSmartExploits = function(req,res,next){
    var cve = "%"+req.params["cve"]+"%";
    var sql = 'select fid from smartexploits where source = ? and ereferences LIKE ?';
    var inserts = ["exploit-db.com",cve];
    sql = mysql.format(sql,inserts);
    connection.query(sql, function (err, rows) {
        console.log("rows",rows );
        if(rows != ""){
            var fid = rows[0].fid;
            fs.readFile('./public/data/exploitfiles/'+fid, 'utf8',function(err,content){
                if (err) {
                    return console.log("err",err);
                }
                res.json(content.toString());
            });
        }else{
            res.json({
                msg : "null"
            });
        }
    });


    fs.readFile('/etc/hosts', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
}

function call(connection,query,req,res,next){
        connection.query(query, function (err, rows) {
           /* if(err){
                throw err;
            }else {
                res.json(rows);
            }*/
            //connection.release();
            try{
                res.json(rows);
            }catch(err){
                console.log(err.code);
                console.log(err.fatal);
                res.json(err);
            }
        });


}