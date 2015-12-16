'use strict';

angular.module('parkLocator').controller('activityFilterCtrl', [ '$scope', 'amenitiesService', 'storageService',
	function ($scope, amenitiesService, storageService) {
    
	  // Define the list of activities that is loaded async
    $scope.amenities = amenitiesService.list;
    // Filter by activity section
    $scope.selectedActivities = amenitiesService.selectedActivities;
    // Mark as visited
    storageService.settings.filterActivities.done = true;
    

    $scope.addToSelected = function (amenity) {
    	$scope.selectedActivities.current.push(amenity);
    	$scope.amenities.uniques.splice( $scope.amenities.uniques.indexOf(amenity), 1);
    };

    $scope.removeSelected = function (amenity) {
    	$scope.amenities.uniques.push( amenity );
    	$scope.selectedActivities.current.splice($scope.selectedActivities.current.indexOf(amenity), 1);
    };

  }]);
