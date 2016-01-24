/**
 * Created by dongyin on 8/22/15.
 */

var mainApplicationModule = angular.module('mainApplicationModule',
    [
        'ui.router',
        'header',
        'sidebar',
        'index',
        'cves',
        'tree',
        'table',
        'detail'
    ]);

angular.element(document).ready(function(){
   angular.bootstrap(document,['mainApplicationModule']);
});

