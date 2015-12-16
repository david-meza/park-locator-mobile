'use strict';

angular.module('parkLocator').factory('storageService', function(){
	
	var settings = {
    location: { done: false },
    filterActivities: { done: false },
    parkSelection: { done: false }
  };  

	return {
		settings: settings
	};
});