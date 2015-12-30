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
    }
]);