/**
 * Created by dongyin on 9/5/15.
 */
header.controller("headerController",function($scope,$http,$rootScope,$state,$mdDialog,$timeout) {


    $scope.object = {};
    $scope.selectedVendor = '';
    $scope.object.filter = '';
    var times = 0;
    var excuted = false;
    $(document).on('keypress', '#vendor', getVendorInfo);
    function getVendorInfo() {
        if($('#vendor').val().length+1 > 2 && !excuted){
            $http.get('/data/vendor/'+$('#vendor').val()).then(function (data) {
                // var temp = _.slice(data.data,0,10);
                $scope.object.vendor = _.map(data.data, function (d) {
                    return d.vendor;
                });
                excuted = true;
            });
        }else if($('#vendor').val().length+1 < 2){
            $scope.object.vendor = [];
            excuted = false;
        }

    }


    function getVulnInfo() {
        $http.get('/data/vuln/' + $scope.object.selectedVendor).then(function (data) {
            $scope.object.products = data.data;
        });

    };
    $(document).on('change', '#vendor', getVulnInfo);

    $scope.getTreeChart = function() {
        if ($scope.object.selectedVendor == null) {
            showAlert();
        } else {
            $rootScope.object = $scope.object;
                $state.go("tree");


        }
    }

    function showAlert() {
        var alert = $mdDialog.alert({
            title: "Product name can't be null",
            textContent: 'This is an example of how easy dialogs can be!',
            ok: 'Close',
            ariaLabel:'Alert Dialog Demo'
        });
        $mdDialog.show( alert );
    }

    $(document).on('focus', '#filter', getVersionNum);

    function getVersionNum(){
        $http.get('/data/vuln/version/' + $scope.object.selectedVendor+'/'+$scope.object.selected).then(function (data) {
            var arr = _.forEach(data.data,function(d){
                if(d.vers_num ==""){
                    d.vers_num = "empty";
                }
            })

            $scope.object.versionNum = arr;
        });


    }

});
