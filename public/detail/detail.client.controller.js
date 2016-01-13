/**
 * Created by dongyin on 1/11/16.
 */
detail.controller('detailController',['$scope','items','$mdDialog','$http','$sce',
    function($scope,items,$mdDialog,$http,$sce){
    $scope.cve = items;
    $(function(){
        SyntaxHighlighter.all();
    });

    $scope.content = "";
    $http.get('data/smartexploits/CVE-2014-8322').then(function(data){
        console.log(data);

        $scope.content = $sce.trustAsHtml(data.data);
    });
    $scope.closeDialog = function(){
        $mdDialog.cancel();
    }
}]);