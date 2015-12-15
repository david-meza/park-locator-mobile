'use strict';

angular.module('parkLocator').directive('accordionMenu', function(){
  
  return { 
    controller: 'accordionCtrl',
    restrict: 'E',
    templateUrl: 'templates/directives/accordion-menu.html',
  };

});