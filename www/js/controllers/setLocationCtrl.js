'use strict';

angular.module('parkLocator').controller('setLocationCtrl', [ '$scope', 'mapService', 'uiGmapGoogleMapApi', '$state', '$ionicViewSwitcher', 'storageService',
	function ($scope, mapService, gMapsAPI, $state, $ionicViewSwitcher, storageService) {
    
    $scope.map = mapService.map;
    $scope.myLoc = mapService.map.myLocationMarker.coords;

    // Search box inside set my location panel
	  var autocomplete;

	  gMapsAPI.then(function(maps) {
	  	$scope.mapsApi = maps;
	  	// Address typeahead
	    var input = document.getElementById('manual-set');
	    var options = {
	      componentRestrictions: {country: 'us'}
	    };
	    autocomplete = new maps.places.Autocomplete( input, options );
	    autocomplete.addListener('place_changed', updateUserMarker);
	    var circle = new maps.Circle({
        center: {lat: 35.79741992502266, lng: -78.64118938203126 },
        // Radius is in meters - 15km
        radius: 15000
      });
      // Bias autocomplete results to locations in Raleigh
      autocomplete.setBounds(circle.getBounds());

	  });

    var goBack = function() {
      storageService.settings.location.done = true;
      $ionicViewSwitcher.nextDirection = 'back';
      $state.go('tab.search');
    }

	  // Function used by address typeahead on a place selected
	  var updateUserMarker = function() {
      var loc = autocomplete.getPlace().geometry.location;
      $scope.$apply(mapService.updateUserCoords(loc.lat(), loc.lng()));
      goBack();
	  };

    // Set Location Section
    $scope.geoLocate = function() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function (position) {
          $scope.$apply(mapService.updateUserCoords(position.coords.latitude, position.coords.longitude));
        });
      } else {
        console.log('Geolocation not supported');
      }

      goBack();
    };

  }]);
