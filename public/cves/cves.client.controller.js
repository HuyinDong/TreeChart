/**
 * Created by dongyin on 1/23/16.
 */

cves.controller('cvesController',function($scope,$http){
    $scope.cves = {};
    console.log("cves");
        $http.get('/data/cves').then(function(data){
            $scope.cves = data.data;
            console.log(data.data);
            $scope.total = data.data.length;
        });
});