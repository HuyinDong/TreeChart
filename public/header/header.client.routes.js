/**
 * Created by dongyin on 12/25/15.
 */
header.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider
           /* .state('home', {
                url: '/',
                templateUrl: './header/header.client.view.html',
                controller : 'headerController'
            })*/
            .state('tree', {
                url: '/tree',
                templateUrl: './tree/tree.client.view.html',
                controller : 'treeController'
            })
    }
]);