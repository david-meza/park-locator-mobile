'use strict';

angular.module('parkLocator').controller('parkSelectionCtrl', [ '$scope', 'mapService', 'storageService', 'parkService',
	function ($scope, mapService, storageService, parkService) {
    
	  // Define some async objects from our services
    $scope.parks = parkService.markers;
    $scope.map = mapService.map;
    $scope.myLoc = mapService.map.myLocationMarker.coords;
    // Limit to number of parks initially shown
    $scope.parksLimit = undefined;
    
    $scope.$watch('parks.content.length', function (newVal) {
      $scope.parksLimit = Math.min(10, newVal);
    });
    
    // Expand the list of park results
    $scope.showAll = function () {
      $scope.parksLimit = $scope.parks.content.length;
    };

    var parkResults = $scope.parks.content.length;

    // Select a park section
    $scope.centerToPark = function (park) {
    	park.onMarkerClicked();
    	$scope.map.location.coords.latitude = park.latitude;
    	$scope.map.location.coords.longitude = park.longitude;
    	$scope.map.zoom = 16;
    };

    $scope.nearestPark = function (park) {
      // We calculate the distance between two points use Pythagorean theorem. It is not extremely accurate (unless you can walk through buildings), but it gives us a decent idea about the distance between the user and the park (better than alphabetically sorting).
      var a = Math.abs(park.latitude - $scope.myLoc.latitude);
      var b = Math.abs(park.longitude - $scope.myLoc.longitude);
      return Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) );
    };

  }]);
