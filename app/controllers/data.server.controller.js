/**
 * Created by dongyin on 8/22/15.
 */

    console.log("controller");
var connection = require('../../config/mysql');
var mysql = require('mysql');
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

exports.getVuln = function(req,res,next){
    console.log("getVuln");
    console.log(req.params);
    call(connection,'select * from vuln_soft',req,res,next);
};

exports.selectOne = function(req,res,next){
    console.log("selectOne");
    var sql = 'select distinct(prod_name) from vuln_soft where vendor = ?';
    var inserts = [req.params["vendor"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

exports.selectProducts = function(req,res,next){
    console.log("selectProducts");
    var sql = 'select * from vuln_soft where vendor = ? and prod_name = ?';
    var inserts = [req.params["vendor"],req.params["product"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

exports.selectAll = function(req,res,next){
    var sql = 'select * from ??';
    var inserts = [req.params["table"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

function call(connection,query,req,res,next){
    connection.query(query,function(err,rows){
        res.json(rows);
    });
}