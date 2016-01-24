/**
 * Created by dongyin on 12/25/15.
 */
header.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home',{
                url: '/home',
                templateUrl: './index/index.client.view.html',
                controller : 'indexController'
            })
            .state('cves',{
                url: '/cves',
                templateUrl: './cves/cves.client.view.html',
                controller : 'cvesController'
            })
            .state('exploits',{
                url: '/exploits',
                templateUrl: './exploits/exploits.client.view.html',
                controller : 'exploitsController'
            })
            .state('vendor',{
                url: '/vendor',
                templateUrl: './vendor/vendor.client.view.html',
                controller : 'vendorController'
            })
            .state('references',{
                url: '/references',
                templateUrl: './references/references.client.view.html',
                controller : 'referencesController'
            })
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
                url : '/detail/:cve',
                templateUrl : './detail/detail.client.view.html',
                controller : 'detailController'
            })
    }
]);