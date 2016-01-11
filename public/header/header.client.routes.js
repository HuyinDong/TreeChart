/**
 * Created by dongyin on 12/25/15.
 */
header.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('tree', {
                url: '/tree',
                templateUrl: './tree/tree.client.view.html',
                controller : 'treeController'
            })
            .state('table',{
                url : '/table',
                templateUrl : './table/table.client.view.html',
                controller : 'tableController'
            })
            .state('detail',{
                url : 'detail/:cve',
                templateUrl : './detail/detail.client.view.html',
                controller : 'detailController'
            })
    }
]);