/**
 * Created by dongyin on 1/11/16.
 */
detail.controller('detailController',['$scope','items','$mdDialog','$http','$sce','$timeout',
    function($scope,items,$mdDialog,$http,$sce,$timeout){
        $scope.loading = true;
    $scope.cve = items;
    $(function(){
        SyntaxHighlighter.all();
    });
    $scope.newData = [];
    $scope.contents = [];


    $http.get('data/smartexploits/CVE-2013-4625').then(function(data){
        console.log(data);
        $scope.info = data.data.rows;

        $timeout(function(){
        $scope.loading = false;
        for(var i = 0 ;i < data.data.results.length;i++){
            $scope.newData.push($sce.trustAsHtml(data.data.results[i]));
        }

    },800);
    });
    $scope.closeDialog = function(){
        $mdDialog.cancel();
    }
}]);