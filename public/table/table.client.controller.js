/**
 * Created by dongyin on 1/10/16.
 */
table.controller("tableController",['$rootScope','$scope', '$http','$timeout','$mdDialog',
    function ($rootScope,$scope, $http,$timeout,$mdDialog) {
    var cve ;
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
        var cellTemplate = '<div id={{row.entity.name}}-{{col.colDef.name}} ' +
            'class="ui-grid-cell-contents"> {{COL_FIELD CUSTOM_FILTERS}}</div>';
        $scope.gridOptions = {
            enableFiltering: true,
            treeRowHeaderAlwaysVisible: false,
            enableColumnMenus: false,
            enableMinHeightCheck:true,
            enableFullRowSelection:true,
            enableSelectAll: false,
            enableRowHeaderSelection:false,
            multiSelect:false,
            columnDefs: [
                { field: 'edition', width: '33%', displayName : 'Edtion',allowCellFocus : false},
                { field: 'vname', width: '33%' , displayName : 'CVE',cellTemplate: cellTemplate},

                { field: 'vers_num',  grouping: { groupPriority: 0 },allowCellFocus : false,
                    sort: { priority: 0, direction: 'desc' }, width: '29%',displayName : 'Version Number',}
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                console.log(gridApi);
                gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol) {
                    var cve = $scope.gridApi.grid.getCellValue(newRowCol.row,newRowCol.col);
                    console.log(cve);
                   if(cve) {
                       $mdDialog.show({
                           templateUrl: './detail/detail.client.view.html',
                           locals: {
                               items: cve
                           },
                           controller: 'detailController',
                           onComplete: afterShowAnimation,
                           clickOutsideToClose: true
                       });

                       function afterShowAnimation(scope, element, options) {
                           SyntaxHighlighter.all();
                       }
                   }
                });

               /* getFocusedCell($scope,function(row){
                    var msg = 'row selected ' + row.isSelected;
                    console.log(msg);
                    if(row.isSelected){
                        $scope.selected = true;
                        cve = row.entity.vname;

                    }else{
                        $scope.selected = false;
                    }
                });*/
            }
        };

        /*
         gridApi.grid.cellNav.clearFocus();
         gridApi.grid.cellNav.lastRowCol = null;
         */
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