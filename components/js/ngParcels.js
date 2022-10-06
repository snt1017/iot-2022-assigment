locApp = angular.module('angLocApp', []);

locApp.controller('ParcelsController', ($scope, $http) => {

	let URL_ALL_CUST = document.location.origin + "/getAllCustomers";

	$scope.customerToFilter = 'all';
	$scope.parcels = [];


	$scope.loadParcels = () => {
		console.debug("loadParcels", $scope.customerToFilter);
		$scope.parcels = [];
	}

	$scope.onChangeParcels = () => {
		console.debug("onChangeParcels", $scope.customerToFilter);
		$scope.loadParcels();
	}

	$scope.addParcel = () => {
		console.debug("addParcel");
		// $scope.loadParcels();
		document.location = document.location.origin + "/add-parcel";
	}

	$http.get(URL_ALL_CUST).then((response) => {
		if (!response.data) $scope.customers = [];
		response.data.forEach((e) => {
			e.custLocation = String(e.custLocation);
		})
		$scope.customers = response.data;
	});
	$scope.loadParcels();


});

