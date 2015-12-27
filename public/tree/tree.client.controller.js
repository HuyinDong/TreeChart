tree.controller("treeController",function($scope,$http,$rootScope,$state) {


    /**
     * Created by dongyin on 12/25/15.
     */

    var object = $rootScope.object;
    var newData = [];
    var version = [];
    var temp,newArr;
    var layer2;
    var root = {
        name : object.selected
    };

    /****************************
     **********layer3************
     ****************************/



    $http.get('/data/vuln/' + object.vendor+'/'+object.selected).then(function (data) {
        newData = data.data;
        newArr = _.sortBy(newData, function(num){ return num.vers_num; });

        //generate layer 2
        temp = newArr[0].vers_num;
        version.push(temp);
        for(var i = 1;i< newArr.length;i++){
                if(temp == newArr[i].vers_num){
                    continue;
                }else{
                    version.push(newArr[i].vers_num);
                    temp = newArr[i].vers_num;
                }
        }
        layer2 = _.map(version,function(num){
            if(num == ""){
                num = " "
            }
            return {
                name : num,
                children : null
            }
        })
        root.children = layer2;


        //generate layer 3
        var layer3 = [];
        var groupArr = _.groupBy(newArr, function(num){
            return num.vers_num;
        });
        var middleLayer = [];
        console.log(groupArr);


        for(var i = 0; i<version.length;i++){
            var newGroupArr = _.chunk(groupArr[version[i]],30);

            var name ;
            for(var j = 0; j < newGroupArr.length;j++){
                if(newGroupArr[j].length <30 || j==newGroupArr[j].length-1){
                    name = 1+(30*j)+"-"+((30*j)+newGroupArr[j].length);
                }else{
                    name = 1+(30*j)+"-"+(30+(30*j));
                }
               for(var m = 0; m < newGroupArr[j].length;m++){
                   if( newGroupArr[j][m].edition ==""){
                       newGroupArr[j][m].name = "N/A";
                   }else{
                       newGroupArr[j][m].name = newGroupArr[j][m].edition;
                   }
                   newGroupArr[j][m].children = [{
                       name : newGroupArr[j][m].vname
                   }]
               }
                middleLayer.push({
                    name : name,
                    children : newGroupArr[j]
                })
            }
            root.children[i].children = middleLayer;
            middleLayer=[];
            newGroupArr = [];
            }

            console.log(root);

            /*
            var m = 0;*/
            /*for(var k = 0; k <groupArr[version[i]].length;k++) {
                var edition = groupArr[version[i]][k].edition;
                 if(groupArr[version[i]][k].edition==""){
                 edition = "N/A";
                 }
                 layer3.push({
                 name : edition
                 });
                 if(layer3.length>30){
                     middleLayer[m].children = layer3;
                     layer3=[];
                     m++;
                 }
                 }*/
                // console.log(middleLayer);
            //root.children[i].children = middleLayer;



    var m = [20, 120, 20, 120],
        w = 1280 - m[1] - m[3],
        h = 800 - m[0] - m[2],
        i = 0;


    var tree = d3.layout.tree()
        .size([h, w]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var vis = d3.select("#body").append("svg:svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("svg:g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");


        root.x0 = h / 2;
        root.y0 = 0;

        function toggleAll(d) {
            if (d.children) {
                d.children.forEach(toggleAll);

                toggle(d);
            }
        }

        // Initialize the display to show a few nodes.
        root.children.forEach(toggleAll);
        //toggle(root.children[1]);
        // toggle(root.children[1].children[2]);
        //toggle(root.children[9]);
        //toggle(root.children[9].children[0]);
        update(root);

    function update(source) {
        var duration = d3.event && d3.event.altKey ? 5000 : 500;

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse();

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; });

        // Update the nodes…
        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("click", function(d) { toggle(d); update(d); });

        nodeEnter.append("svg:circle")
            .attr("r", 1e-6)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeEnter.append("svg:text")
            .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 4.5)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = vis.selectAll("path.link")
            .data(tree.links(nodes), function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("svg:path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            })
            .transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

// Toggle children.
    function toggle(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        if (d.parent) {
            d.parent.children.forEach(function(element) {
                if (d !== element) {
                    collapse(element);
                }
            });
        }
    }

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }
    });
});