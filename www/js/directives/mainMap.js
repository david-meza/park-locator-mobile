'use strict';

angular.module('parkLocator').directive('mainMap', function(){
	return {
		
		controller: 'mapCtrl',
		restrict: 'E',
		templateUrl: 'templates/directives/map.html',
		replace: true,

	};
});