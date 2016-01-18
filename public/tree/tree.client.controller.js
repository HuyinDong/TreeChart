tree.controller("treeController",function($scope,$http,$rootScope,$state,$timeout,$mdDialog) {


    /**
     * Created by dongyin on 12/25/15.
     */
    $scope.loading = true;
    var object = $rootScope.object;
   if(object.filter == "empty"){
       object.filter = "";
   }
    var newData = [];
    var root = {
        name : object.selectedVendor+"/"+object.selected
    };

    /****************************
     **********layer3************
     ****************************/
    if(object.filter == ""){
        object.filter = 'empty';
    }

    $timeout(function() {
        $http.get('/data/vendor/tree/like/' + object.selectedVendor + '/' + object.selected + '/' + object.filter).then(function (data) {
            $scope.loading = false;
            newData = data.data;
            console.log(newData);
            root.children = _.map(newData,function(d){
                if(d.vers_num == ""){
                    d.name = "empty";
                }else{
                    d.name = d.vers_num;
                }
                    return d;
            });
            d3.select("svg").remove();
            var m = [20, 120, 20, 120],
                w = 1920 - m[1] - m[3],
                h = 1400 - m[0] - m[2],
                i = 0;

            var tree = d3.layout.tree()
                .size([h, w]);

            var diagonal = d3.svg.diagonal()
                .projection(function (d) {
                    return [d.y, d.x];
                });

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
                nodes.forEach(function (d) {
                    d.y = d.depth * 280;
                });

                // Update the nodes…
                var node = vis.selectAll("g.node")
                    .data(nodes, function (d) {
                        return d.id || (d.id = ++i);
                    });

                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append("svg:g")
                    .attr("class", "node")
                    .attr("transform", function (d) {
                        return "translate(" + source.y0 + "," + source.x0 + ")";
                    })
                    .on("click", function (d) {
                        toggle(d);
                    });

                nodeEnter.append("svg:circle")
                    .attr("r", 1e-6)
                    .style("fill", function (d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });

                nodeEnter.append("svg:text")
                    .attr("x", function (d) {
                        return d.children || d._children ? -10 : 10;
                    })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function (d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function (d) {
                        return d.name;
                    })
                    .style("fill-opacity", 1e-6);

                // Transition nodes to their new position.
                var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", function (d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    });

                nodeUpdate.select("circle")
                    .attr("r", 3.5)
                    .style("fill", function (d) {
                        return d._children ? "lightsteelblue" : "#fff";
                    });

                nodeUpdate.select("text")
                    .style("fill-opacity", 1);

                // Transition exiting nodes to the parent's new position.
                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function (d) {
                        return "translate(" + source.y + "," + source.x + ")";
                    })
                    .remove();

                nodeExit.select("circle")
                    .attr("r", 1e-6);

                nodeExit.select("text")
                    .style("fill-opacity", 1e-6);

                // Update the links…
                var link = vis.selectAll("path.link")
                    .data(tree.links(nodes), function (d) {
                        return d.target.id;
                    });

                // Enter any new links at the parent's previous position.
                link.enter().insert("svg:path", "g")
                    .attr("class", "link")
                    .attr("d", function (d) {
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
                    .attr("d", function (d) {
                        var o = {x: source.x, y: source.y};
                        return diagonal({source: o, target: o});
                    })
                    .remove();

                // Stash the old positions for transition.
                nodes.forEach(function (d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

                // Toggle children.
            var depthTwoArr;
            var depthTwoTimes= 0;
            var depthTwoChildren;
            var depthThreeArr;
            var depthThreeTimes= 0;
            var depthThreeChildren;
            function toggle(d) {
                console.log(d);
                if(d.name == "Load More" && d.depth == 2){
                    console.log(depthTwoArr);
                    console.log(depthTwoTimes);
                    var temp = _.map(depthTwoArr[depthTwoTimes], function (d) {
                        var name;
                        if(d.cvename == null)
                        {
                            if (d[Object.keys(d)[0]] == "") {
                                name = "empty";
                            } else {
                                name = d[Object.keys(d)[0]];
                            }
                            return {
                                name: name
                            }
                        }else{
                            if (d[Object.keys(d)[1]] == "") {
                                name = "empty";
                            } else {
                                name = d[Object.keys(d)[1]];
                            }
                            return {
                                name: name
                            }
                        }
                    });

                    depthTwoChildren.pop();
                    depthTwoChildren = depthTwoChildren.concat(temp);
                    depthTwoTimes++;
                    if(depthTwoTimes < depthTwoArr.length){
                        depthTwoChildren.push({
                            name : "Load More"
                        });
                    }
                    d.parent.children = depthTwoChildren;
                    update(d);
                }else if(d.name == "Load More" && d.depth == 3){

                    var temp = _.map(depthThreeArr[depthThreeTimes], function (d) {
                        var name;
                        if(d.cvename == null)
                        {
                            if (d[Object.keys(d)[0]] == "") {
                                name = "empty";
                            } else {
                                name = d[Object.keys(d)[0]];
                            }
                            return {
                                name: name
                            }
                        }else{
                            if (d[Object.keys(d)[1]] == "") {
                                name = "empty";
                            } else {
                                name = d[Object.keys(d)[1]];
                            }
                            return {
                                name: name
                            }
                        }
                    });
                    depthThreeChildren.pop();
                    depthThreeChildren = depthThreeChildren.concat(temp);
                    depthThreeTimes++;
                    if(depthThreeTimes < depthThreeArr.length){
                        depthThreeChildren.push({
                            name : "Load More"
                        });
                    }
                    d.parent.children = depthThreeChildren;
                    update(d);
                }else if(d.depth == 2 || d.depth ==1){
                    if(d.depth == 1) {
                        depthTwoArr = [];
                        depthTwoTimes = 0;
                        depthTwoChildren = [];
                    }
                    if(d.depth == 2) {
                        depthThreeArr = [];
                        depthThreeTimes = 0;
                        depthThreeChildren = [];
                    }
                    if (d.children) {
                        d._children = d.children;
                        d.children = null;
                    } else {
                        d.children = d._children;
                        d._children = null;
                    }
                    if (d.parent) {
                        d.parent.children.forEach(function (element) {
                            if (d !== element) {
                                collapse(element);
                            }
                        });
                    }
                    var path = "/" + d.name;
                    var par = d.parent;
                    for (var i = 1; i < d.depth; i++) {
                        path = path + "/" + par.name;
                        console.log(path);
                        par = par.parent;
                    }
                    var newPath = path.split("/");
                    newPath.shift();
                    console.log(newPath);
                    path = "";
                    for (var i = 0; i < newPath.length; i++) {
                        path += "/" + newPath[newPath.length - 1 - i];
                    }
                    console.log(path);
                    $http.get('/data/vendor/tree/' + object.selectedVendor + '/' + object.selected + path)
                        .then(function (data) {
                            if (data.data.length > 7) {
                                var totalArray;
                                totalArray = _.chunk(data.data, 7);

                                var children = _.map(totalArray[0], function (d) {
                                    var name;
                                         if(d.cvename == null)
                                         {
                                             if (d[Object.keys(d)[0]] == "") {
                                                 name = "empty";
                                             } else {
                                                 name = d[Object.keys(d)[0]];
                                             }
                                             return {
                                                 name: name
                                             }
                                         }else{
                                             if (d[Object.keys(d)[1]] == "") {
                                                 name = "empty";
                                             } else {
                                                 name = d[Object.keys(d)[1]];
                                             }
                                             return {
                                                 name: name
                                             }
                                         }
                                });
                                if(d.depth == 1){
                                    depthTwoArr = totalArray;
                                    depthTwoChildren = children;
                                    depthTwoChildren.push({
                                        name: "Load More"
                                    });
                                    depthTwoTimes++;
                                }else if(d.depth == 2){
                                    depthThreeArr = totalArray;
                                    depthThreeChildren = children;
                                }else{

                                }
                                console.log(depthTwoArr);
                                if(d.depth == 1){
                                }else if(d.depth == 2){
                                    depthThreeChildren.push({
                                        name: "Load More"
                                    });
                                    depthThreeTimes++;
                                }else{

                                }
                            }else{
                                var children;
                                children = _.map(data.data, function (d) {
                                    var name;
                                    if(d.cvename == null)
                                    {
                                        if (d[Object.keys(d)[0]] == "") {
                                            name = "empty";
                                        } else {
                                            name = d[Object.keys(d)[0]];
                                        }
                                        return {
                                            name: name
                                        }
                                    }else{
                                        if (d[Object.keys(d)[1]] == "") {
                                            name = "empty";
                                        } else {
                                            name = d[Object.keys(d)[1]];
                                        }
                                        return {
                                            name: name
                                        }
                                    }
                                });
                                if(d.depth == 1){
                                    depthTwoChildren = children;
                                }else if(d.depth == 2){
                                    depthThreeChildren = children;
                                }else{

                                }
                            }
                            d.children = children;
                            update(d);
                        });

                }else if(d.depth == 3){
                    $mdDialog.show({
                        templateUrl: './detail/detail.client.view.html',
                        locals: {
                            items: d.name
                        },
                        controller: 'detailController',
                        clickOutsideToClose: true
                    });
                }else{
                    console.log("wrong");
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
    },1000);
});