<?php
$DBhost = "localhost";
$DBuser = "chemmolc_jesse";
$DBpass = "H0wAr1Y0u";
$DBName = "smartexploits";

mysql_connect($DBhost,$DBuser,$DBpass) or die("Unable to connect to database" . mysql_error());

@mysql_select_db("$DBName") or die("Unable to select database $DBName" . mysql_error() );

$mysqli = new mysqli("localhost", "chemmolc_jesse", "H0wAr1Y0u", "smartexploits");
?>
