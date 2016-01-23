/**
 * Created by dongyin on 1/22/16.
 */
index.controller('indexController', function($scope,$http,$rootScope){
    $scope.numbers = {};

    $http.get('data/week_new.json').then(function(data){
        $scope.numbers.exploit = data.data.Exploit;
        $scope.numbers.cve = data.data.CVE;
        $scope.numbers.vendor = $rootScope.numbers.vendor;
        $scope.numbers.prod = $rootScope.numbers.prod;
        $scope.numbers.ref = $rootScope.numbers.ref;
    });
});