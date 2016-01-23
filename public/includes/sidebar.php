<?php
$all_total = file_get_contents("./data/all_total.json");
$all_total_json = json_decode($all_total, true);
?>

			<!-- start: Main Menu -->
			<div id="sidebar-left" class="span2">
				<div class="nav-collapse sidebar-nav">
					<ul class="nav nav-tabs nav-stacked main-menu">
						<li><a href="index.php"><i class="fa fa-tachometer"></i> <span class="hidden-tablet"> Dashboard</span></a></li>	
						<li><a href="cve.php"><i class="fa fa-bug"></i> <span class="hidden-tablet"> CVEs </span>  <span class="label orange pull-right"> <?=number_format($all_total_json['CVE'])?> </span></a></li>
						<li><a href="exploit.php"><i class="fa fa-unlock"></i> <span class="hidden-tablet"> Exploits </span>  <span class="label label-important pull-right"> <?=number_format($all_total_json['Exploit'])?> </span> </a></li>
                        <li><a href="vendor.php"><i class="fa fa-list"></i>  <span class="hidden-tablet"> Vendors</span>  <span class="label label-info pull-right"> <?=number_format($all_total_json['Vendor'])?> </span> </a></li>
						<li><a href="refs.php"><i class="fa fa-info-circle"></i>  <span class="hidden-tablet"> References</span>  <span class="label label-success pull-right"> <?=number_format($all_total_json['Ref'])?> </span> </a></li>
 						<!-- li>
							<a class="dropmenu" href="#"><i class="fa fa-sitemap"></i>  <span class="hidden-tablet"> Smart Exploit </span><span class="label label-important pull-right"> + </span></a>
							<ul >
								<li> <a class="submenu" href="smarttable.php"> <i class="fa fa-table"></i>  <span class="hidden-tablet"> Table </span></a></li>
								<li> <a class="submenu" href="smartchart.php"> <i class="fa fa-random"></i>  <span class="hidden-tablet"> Chart </span></a></li>
							</ul>	
						</li -->
						 
					</ul>
				</div>
			</div>
			<!-- end: Main Menu -->

			<noscript>
				<div class="alert alert-block span10">
					<h4 class="alert-heading">Warning!</h4>
					<p>You need to have <a href="http://en.wikipedia.org/wiki/JavaScript" target="_blank">JavaScript</a> enabled to use this site.</p>
				</div>
			</noscript>			
