'use strict';

angular.module('parkLocator').controller('searchCtrl', ['$scope', 'storageService',
	function($scope, storageService){

    $scope.storage = storageService.settings;

}]);