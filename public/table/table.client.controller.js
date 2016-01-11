/**
 * Created by dongyin on 1/10/16.
 */
table.controller("tableController",['$rootScope','$scope', '$http', '$interval', 'uiGridGroupingConstants', function ($rootScope,$scope, $http, $timeout,$interval, uiGridGroupingConstants ) {

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


        $scope.gridOptions = {
            enableFiltering: true,
            treeRowHeaderAlwaysVisible: false,
            enableColumnMenus: false,
            enableMinHeightCheck:true,
            columnDefs: [
                { name: 'vendor', width: '20%', displayName: 'Vendor'},
                { name: 'prod_name',  width: '20%' ,displayName: 'Product'},
                { name: 'vname', width: '20%' , displayName: 'CVE'},
                { name: 'edition', width: '20%', displayName: 'Edition'},
                { name: 'vers_num',  displayName: 'Version',grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'desc' }, width: '15%',
                    cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>' },
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
            }
        };

        $http.get('data/vuln/table/' + object.selectedVendor + '/' + object.selected+'/'+object.filter)
            .then(function(data) {
                console.log(data);
                var items = data.data;
                $scope.gridOptions.data = items;

            });

        $scope.expandAll = function(){
            $scope.gridApi.treeBase.expandAllRows();
        };

        $scope.toggleRow = function( rowNum ){
            $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
        };

        $scope.changeGrouping = function() {
            $scope.gridApi.grouping.clearGrouping();
            $scope.gridApi.grouping.groupColumn('age');
            $scope.gridApi.grouping.aggregateColumn('state', uiGridGroupingConstants.aggregation.COUNT);
        };

        $scope.getAggregates = function() {
            var aggregatesTree = [];
            var gender;

            var recursiveExtract = function( treeChildren ) {
                return treeChildren.map( function( node ) {
                    var newNode = {};
                    angular.forEach(node.row.entity, function( attributeCol ) {
                        if( typeof(attributeCol.groupVal) !== 'undefined' ) {
                            newNode.groupVal = attributeCol.groupVal;
                            newNode.aggVal = attributeCol.value;
                        }
                    });
                    newNode.otherAggregations = node.aggregations.map( function( aggregation ) {
                        return { colName: aggregation.col.name, value: aggregation.value, type: aggregation.type };
                    });
                    if( node.children ) {
                        newNode.children = recursiveExtract( node.children );
                    }
                    return newNode;
                });
            }

            aggregatesTree = recursiveExtract( $scope.gridApi.grid.treeBase.tree );

            console.log(aggregatesTree);
        };
    }])
    .filter('mapGender', function() {
        var genderHash = {
            1: 'male',
            2: 'female'
        };

        return function(input) {
            var result;
            var match;
            if (!input){
                return '';
            } else if (result = genderHash[input]) {
                return result;
            } else if ( ( match = input.match(/(.+)( \(\d+\))/) ) && ( result = genderHash[match[1]] ) ) {
                return result + match[2];
            } else {
                return input;
            }
        };
    });