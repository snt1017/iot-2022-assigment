locApp = angular.module('angLocApp', []);

locApp.controller('CustomersController', function ($scope, $http) {

	let URL_ALL_CUST = document.location.origin + "/getAllCustomers";
	let URL_ALL_LOCATIONS = document.location.origin + "/getAllLocations";
	let URL_INSERT_CUST = document.location.origin + "/insCustomer?";
	let URL_DELETE_CUST = document.location.origin + "/delCustomer?";
	let URL_UPDATE_CUST = document.location.origin + "/updateCustomer?";


	$scope.customers = [];
	$scope.locations = [];

	$scope.customerToUpdate = null;
	$scope.action = 'update';
	$scope.custLocation = 1;

	$http.get(URL_ALL_CUST).then(function (response) {
		if (!response.data) $scope.customers = [];
		response.data.forEach((e) => {
			e.custLocation = String(e.custLocation);
		})
		$scope.customers = response.data;
	});

	$http.get(URL_ALL_LOCATIONS).then(function (response) {
		$scope.locations = response.data;
	});

	$scope.addCustomer = function () {
		let newRawLoc = {};
		let newLoc = {};
		$http.get(URL_INSERT_CUST + `newName=${$scope.newName}&newLocation=${$scope.newLocation}`)
			.then(function (response) {
				newRawLoc = response.data;
				let location = $scope.locations.find((e) => e.locId == newRawLoc.custLocation);
				$scope.newName = null;
				$scope.newLocation = null;
				newLoc = {
					"custId": newRawLoc.id, "custName": newRawLoc.custName, "custLocation": String(newRawLoc.custLocation),
					"locAddress": location.locAddress, "city": location.city
				};
				$scope.customers.push(newLoc);
			});
	}


	$scope.deleteCustomer = (customer) => {
		if (confirm(`Are you sure you want delete customer ${customer.custName}`) == false) return;
		$http.get(URL_DELETE_CUST + `customerId=${customer.custId}`).then(function (response) {
			$scope.customers.splice($scope.customers.indexOf(customer), 1);
		});
	}

	$scope.updateCustomer = (customer) => {
		$scope.action = 'update';
		$scope.customerToUpdate = JSON.parse(JSON.stringify(customer));
		$scope.custLocation = 1
		console.debug("[updateCustomer]", $scope.customerToUpdate);
	}

	$scope.saveCustomer = () => {
		console.debug("[saveCustomer]", $scope.customerToUpdate);
		$http.get(URL_UPDATE_CUST + `customerId=${$scope.customerToUpdate.custId}&custName=${$scope.customerToUpdate.custName}&custLocation=${$scope.customerToUpdate.custLocation}`).then(function (response) {
			let newRawLoc = response.data;
			let i = $scope.customers.findIndex((e)=>e.custId === $scope.customerToUpdate.custId);
			let location = $scope.locations.find((e) => e.locId == newRawLoc.custLocation);

			console.debug(i, $scope.customers);

			$scope.customers[i].custName = newRawLoc.custName;
			$scope.customers[i].custLocation = String(newRawLoc.custLocation);
			$scope.customers[i].locAddress = location.locAddress;
			$scope.customers[i].city = location.city;
			$scope.action = null;
			$scope.customerToUpdate = null;
		});
	}



});

