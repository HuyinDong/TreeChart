/**
 * Created by dongyin on 9/5/15.
 */
header.controller("headerController",function($scope,$http,$rootScope,$state,$mdDialog,$timeout) {


    $scope.object = {};
    $scope.selectedVendor = '';
    $scope.object.filter = '';
    $scope.object.products = '';
    var times = 0;
    var excuted = false;
    $(document).on('keypress', '#vendor', getVendorInfo);
    function getVendorInfo() {
        if($('#vendor').val().length+1 > 2 && !excuted){
            $http.get('/data/vendor/like/'+$('#vendor').val()).then(function (data) {
                console.log(data);
                $scope.object.vendor = _.map(data.data, function (d) {
                    return d.vendor_name;
                });
                console.log($scope.object.vendor);
                excuted = true;
            });
        }else if($('#vendor').val().length+1 < 2){
            $scope.object.vendor = [];
            excuted = false;
        }

    }


    function getVulnInfo() {
        if( $scope.object.products != ''){
            $scope.object.products = '';
        }
        if( $scope.object.filter != ''){
            $scope.object.filter = '';
        }

        $http.get('/data/vendor/' + $scope.object.selectedVendor).then(function (data) {
            $scope.object.products = data.data;
        });

    };
    $(document).on('change', '#vendor', getVulnInfo);

    $scope.getTreeChart = function() {
        if ($scope.object.selectedVendor == null) {
            showAlert();
        } else if($scope.object.type == 'tree'){
            $rootScope.object = $scope.object;
                $state.go("tree",{}, { reload: true });
        }else if($scope.object.type == 'table'){
            $rootScope.object = $scope.object;
            $state.go("table",{}, { reload: true });
        }else{

        }
    };

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
        $http.get('/data/vendor/' + $scope.object.selectedVendor+'/'+$scope.object.selected).then(function (data) {
            var arr = _.forEach(data.data,function(d){
                if(d.vers_num ==""){
                    d.vers_num = "empty";
                }
            })

            $scope.object.versionNum = arr;
        });


    }

});
