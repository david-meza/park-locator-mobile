'use strict';

angular.module('parkLocator').directive('classesInfo', function(){
  
  return { 
    controller: 'classesCtrl',
    restrict: 'E',
    templateUrl: 'templates/directives/classes.html',
    scope: {
    	currentPark: '='
    }
  };

});