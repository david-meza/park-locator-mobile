// .config(function($stateProvider, $urlRouterProvider) {

//   // Ionic uses AngularUI Router which uses the concept of states
//   // Learn more here: https://github.com/angular-ui/ui-router
//   // Set up the various states which the app can be in.
//   // Each state's controller can be found in controllers.js
//   $stateProvider

  // setup an abstract state for the tabs directive
  //   .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })

//   // Each tab has its own nav history stack:

//   .state('tab.dash', {
//     url: '/dash',
//     views: {
//       'tab-dash': {
//         templateUrl: 'templates/tab-dash.html',
//         controller: 'DashCtrl'
//       }
//     }
//   })

//   .state('tab.chats', {
//       url: '/chats',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/tab-chats.html',
//           controller: 'ChatsCtrl'
//         }
//       }
//     })
//     .state('tab.chat-detail', {
//       url: '/chats/:chatId',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/chat-detail.html',
//           controller: 'ChatDetailCtrl'
//         }
//       }
//     })

  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // });

//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/tab/dash');

// });


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

      $urlRouterProvider.otherwise('/');


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
              controller: 'SearchCtrl'
            }
          }
        })

        .state('home', {
          url: '/',
          views: {

            'navbar': {
              templateUrl: 'templates/partials/navbar.html'
            },

            '': {
              templateUrl: 'templates/main.html'
            }

          }
        })

        .state('home.park', {
          url: ':name',
          templateUrl: 'templates/park-information.html',
          controller: 'parkCtrl'

        })

        .state('home.park.section', {
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

