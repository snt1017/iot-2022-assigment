locApp = angular.module('angLocApp', []);

locApp.controller('LocationsController', function ($scope, $http) {

	let URL_ALL_LOCS = document.location.origin + "/getAllLocations";
	let URL_INSERT_LOC = document.location.origin + "/insLocation?";

	$scope.locations = [];

	$scope.newLocation = {
		'address': '',
		'city': ''
	}

	$http.get(URL_ALL_LOCS).then(function (response) {
		$scope.locations = response.data;
	});

	$scope.newLocation = () => {
		let newRawLoc = {};
		let newLoc = {};
		$http.get(URL_INSERT_LOC + `newAddress=${$scope.newLocation.address}&newCity=${$scope.newLocation.city}`).then((response) => {
			newRawLoc = response.data;
			$scope.newAddress = null;
			$scope.newCity = null;
			newLoc = {
				"locId": newRawLoc.id, "locAddress": newRawLoc.address,
				"city": newRawLoc.city
			};
			$scope.locations.push(newLoc);
			$scope.action = null;
			$scope.newLocation = {
				'address': '',
				'city': ''
			}
		});
	}
});

