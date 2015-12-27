/**
 * Created by dongyin on 9/5/15.
 */
header.controller("headerController",function($scope,$http,$rootScope,$state) {


    $scope.object = {};
    $scope.selected = '';

    function getVulnInfo() {
        console.log($scope.object.vendor);
        $http.get('/data/vuln/' + $scope.object.vendor).then(function (data) {
            console.log(data.data);
            $scope.object.products = data.data;

        });

    }
    $(document).on('change', '#vendor', getVulnInfo);
    $scope.getTreeChart = function(){
        console.log($scope.object);
        $rootScope.object = $scope.object;
        $state.go("tree");
    }
});