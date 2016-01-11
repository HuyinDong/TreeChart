/**
 * Created by dongyin on 1/10/16.
 */
table.controller("tableController",['$rootScope','$scope', '$http','$timeout',
    function ($rootScope,$scope, $http,$timeout) {

    $scope.loading = true;
        $scope.selected = false;
        var length ;
        console.log( $scope.selected);
    var object = $rootScope.object;
    if(object.filter == "empty"){
        object.filter = "";
    }

    if(object.filter == ""){
        object.filter = 'empty';
    }
        $scope.gridOptions = {
            enableFiltering: true,
            treeRowHeaderAlwaysVisible: false,
            enableColumnMenus: false,
            enableMinHeightCheck:true,
            enableRowSelection:true,
            enableSelectAll: false,
            multiSelect:false,
            columnDefs: [
                { name: 'edition', width: '33%', displayName: 'Edition'},
                { name: 'vname', width: '33%' , displayName: 'CVE'},

                { name: 'vers_num',  displayName: 'Version',grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'desc' }, width: '29%',
                    cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>' },
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope,function(row){
                    var msg = 'row selected ' + row.isSelected;
                    console.log(msg);
                    if(row.isSelected){
                        $scope.selected = true;
                    }else{
                        $scope.selected = false;
                    }
                });
            }
        };
        $scope.height = "height : "+($(window).height()-82-62-12)+"px";

        $scope.getDetail = function(){
            
        };

        $timeout(function(){
            $http.get('data/vuln/table/' + object.selectedVendor + '/' + object.selected+'/'+object.filter)
                .then(function(data) {
                    $scope.loading = false;
                    console.log(data);
                    var items = data.data;
                    length = items.length;
                    $scope.gridOptions.data = items;

                });
        },1500);



    }]);