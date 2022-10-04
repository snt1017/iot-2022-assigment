locApp = angular.module('angLocApp', []);

locApp.controller('AddParcelController', ($scope, $http) => {

	let URL_ALL_CUST = document.location.origin + "/getAllCustomers";
	let URL_ALL_LOCATIONS = document.location.origin + "/getAllLocations";
	let URL_INSERT_PARCEL = document.location.origin + "/insParcel";

	$scope.customers = [];
	$scope.locations = [];
	$scope.newParcel = {
		customer: null,
		location: null,
		weight: ''
	};


	$http.get(URL_ALL_CUST).then((response) => {
		$scope.customers = response.data;
	});
	$http.get(URL_ALL_LOCATIONS).then((response) => {
		$scope.locations = response.data;
	});


	$scope.addParcel = () => {
		if (!$scope.newParcel.customer || !$scope.newParcel.location || !$scope.newParcel.weight) {
			return showError(null, "All values are required");
		}

		// $http.get(URL_INSERT_PARCEL + `newName=${$scope.newName}&newLocation=${$scope.newLocation}`).then((response) => {
		document.location = document.location.origin + "/parcels";
		// });
	}


});

