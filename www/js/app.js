'use strict';

angular.module('parkLocator', ['ionic', 'ui.bootstrap', 'uiGmapgoogle-maps', 'flash', 'smoothScroll', 'dcbImgFallback'])

  .config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
    
    uiGmapGoogleMapApiProvider.configure({
        v: '3.20',
        libraries: 'places, geometry'
    });

  }])

  .config([ '$httpProvider', function ($httpProvider) {

    $httpProvider.interceptors.push('httpInterceptor');
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    
  }])

  .config(['$stateProvider', '$urlRouterProvider', 
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/map');


      $stateProvider

        // setup an abstract state for the tabs directive
        .state('tab', {
          url: '/',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        })

        .state('tab.search', {
          url: 'search',
          views: {
            'tab-search': {
              templateUrl: 'templates/tab-search.html',
              controller: 'searchCtrl'
            }
          }
        })

        .state('tab.location', {
          url: 'location',
          views: {
            'tab-search': {
              templateUrl: 'templates/partials/set-location.html',
              controller: 'setLocationCtrl'
            }
          }
        })

        .state('tab.activityFilter', {
          url: 'activity-filter',
          views: {
            'tab-search': {
              templateUrl: 'templates/partials/activity-filter.html',
              controller: 'activityFilterCtrl'
            }
          }
        })

        .state('tab.parkSelection', {
          url: 'park-selection',
          views: {
            'tab-search': {
              templateUrl: 'templates/partials/park-selection.html',
              controller: 'parkSelectionCtrl'
            }
          }
        })
        
        .state('tab.map', {
          url: 'map',
          views: {
            'tab-map': {
              templateUrl: 'templates/tab-map.html',
            }
          }
        })

        .state('tab.park', {
          url: ':name',
          views: {
            'tab-park': {
              templateUrl: 'templates/tab-park.html',
              controller: 'parkCtrl'
            }
          }
        })

        .state('tab.park.section', {
          url: '/:sectionName',
          templateUrl: 'templates/course-section.html',
          controller: 'sectionCtrl'
        });

  }])

  .run(['$ionicPlatform', function ($ionicPlatform) {
    $ionicPlatform.ready( function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }]);

