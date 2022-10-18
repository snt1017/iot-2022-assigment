locApp = angular.module('angLocApp', []);

locApp.controller('ParcelsController', ($scope, $http) => {

	let URL_ALL_PARCELS = document.location.origin + "/getParcels";
	let URL_ALL_CUST = document.location.origin + "/getAllCustomers";

	$scope.customerToFilter = 'all';
	$scope.loadingParcels = true;
	$scope.parcels = [];


	$scope.loadParcels = () => {
		console.debug("loadParcels", $scope.customerToFilter);
		$scope.parcels = [];
		$scope.loadingParcels = true;
		url = URL_ALL_PARCELS
		if ($scope.customerToFilter != 'all') url += '?cust=' + $scope.customerToFilter;
		$http.get(url).then((response) => {
			if (!response.data) {
				$scope.parcels = [];
				return;
			}
			$scope.parcels = response.data;
			$scope.loadingParcels = false;
		});
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

