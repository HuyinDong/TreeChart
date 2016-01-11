/**
 * Created by dongyin on 1/10/16.
 */
table.controller("tableController",['$rootScope','$scope', '$http', '$interval', 'uiGridTreeViewConstants', function ($rootScope,$scope, $http, $timeout, uiGridTreeViewConstants ) {

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

    $scope.nodeLoaded = false;
    $scope.gridOptions = {
        enableSorting: true,
        enableFiltering: true,
        showTreeExpandNoChildren: true,
        /*columnDefs: [
         { name: 'Product Name', width: '15%' },
         { name: 'Version Number', width: '15%' },
         { name: 'Edition', width: '15%' },
         { name: 'CVE Name', width: '15%' }
         ],*/

        columnDefs: [
            { name: 'version', width: '15%' },
            { name: 'edition', width: '15%' },
            { name: 'cve', width: '15%' },
            { name: 'product', width: '15%' },
            { name: 'vendor', width: '15%' }
        ],

        onRegisterApi: function( gridApi ) {
            $scope.gridApi = gridApi;
            $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
                if( !$scope.nodeLoaded ) {
                    $http.get('data/vuln/table/' + object.selectedVendor + '/' + object.selected + '/' + row.entity.version).then(function (items) {
                        console.log(items);
                        var children = _.forEach(items.data,function(d){
                            d.$$treeLevel = 1;
                            d.version = d.vers_num;

                        });
                        $scope.gridOptions.data.splice(51,0,children);
                        $scope.nodeLoaded = true;
                    });
                }
                console.log(row);
            });
        }
    };
    $http.get('/data/vuln/' + object.selectedVendor + '/' + object.selected + '/' + object.filter).then(function (data) {
        $scope.loading = false;
        var gridData = [];
        _.forEach(data.data,function(item){
            if(item.vers_num == ""){
                item.vers_num = "empty"
            }
            gridData.push({
                version : item.vers_num,
                $$treeLevel : 0
            })
        });
        $scope.gridOptions.data = gridData;
    });

   /* var data = [];
    data[0] = {
        name:'a',
        $$treeLevel : 0,
        state: 'collapsed',
        children : [
            {
                name : 'b',
                $$treeLevel : 1,
                gender : 'female',
                age : 30,
                company : 'b',
                state1 : 'MD',
            },
            {
                name : 'c',
                $$treeLevel : 1,
                gender : 'female',
                age : 30,
                company : 'c',
                state1 : 'MD',
            },
        ]
    };

    data[1] = {
        name:'d',
        $$treeLevel : 0,
        state: 'expanded',
        children : [
            {
                name : 'e',
                $$treeLevel : 1,
                gender : 'female',
                age : 30,
                company : 'e',
                state1 : 'MD',
            },
            {
                name : 'f',
                $$treeLevel : 1,
                gender : 'female',
                age : 30,
                company : 'f',
                state1 : 'MD',
            },
        ]
    };

    $scope.gridOptions.data = data;
    console.log($scope.gridOptions.data);
    */
    $scope.expandAll = function(){
        $scope.gridApi.treeBase.expandAllRows();
    };

    $scope.toggleRow = function( rowNum ){
        $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
    };

    $scope.toggleExpandNoChildren = function(){
        $scope.gridOptions.showTreeExpandNoChildren = !$scope.gridOptions.showTreeExpandNoChildren;
        $scope.gridApi.grid.refresh();
    };
}]);