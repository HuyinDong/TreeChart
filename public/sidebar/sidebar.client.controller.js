/**
 * Created by dongyin on 1/22/16.
 */
sidebar.controller('sidebarController', function($scope,$http,$rootScope){
    $scope.numbers = {};
    $http.get('data/all_total.json').then(function(data){
        $scope.numbers.prod = data.data.Prod;
        $scope.numbers.vendor = data.data.Vendor;
        $scope.numbers.exploit = data.data.Exploit;
        $scope.numbers.cve = data.data.CVE;
        $scope.numbers.ref = data.data.Ref;
        $rootScope.numbers = $scope.numbers;
    });
});