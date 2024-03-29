locApp = angular.module('angLocApp', []);

locApp.controller('CustomersController', function ($scope, $http) {

	let URL_ALL_CUST = document.location.origin + "/getAllCustomers";
	let URL_ALL_LOCATIONS = document.location.origin + "/getAllLocations";
	let URL_INSERT_CUST = document.location.origin + "/insCustomer?";
	let URL_DELETE_CUST = document.location.origin + "/delCustomer?";
	let URL_UPDATE_CUST = document.location.origin + "/updateCustomer?";


	$scope.loadingCustomers = true;
	$scope.customers = [];
	$scope.locations = [];

	$scope.customerToUpdate = null;
	$scope.action = null;
	$scope.custLocation = 1;

	$scope.newCustomer = {
		name: '',
		location: ''
	}

	$http.get(URL_ALL_CUST).then(function (response) {
		if (!response.data) $scope.customers = [];
		response.data.forEach((e) => {
			e.custLocation = String(e.custLocation);
		})
		$scope.customers = response.data;
		$scope.loadingCustomers = false;
	});

	$http.get(URL_ALL_LOCATIONS).then(function (response) {
		$scope.locations = response.data;
	});

	$scope.addCustomer = () => {
		let newRawLoc = {};
		let newLoc = {};
		$http.get(URL_INSERT_CUST + `newName=${$scope.newCustomer.name}&newLocation=${$scope.newCustomer.location}`)
			.then(function (response) {
				newRawLoc = response.data;
				let location = $scope.locations.find((e) => e.locId == newRawLoc.custLocation);
				$scope.newName = null;
				$scope.newCustomer = {
					name: '',
					location: ''
				};
				newLoc = {
					"custId": newRawLoc.id, "custName": newRawLoc.custName, "custLocation": String(newRawLoc.custLocation),
					"locAddress": location.locAddress, "city": location.city
				};
				$scope.customers.push(newLoc);
				$scope.action = 'null'
			});
	}

	$scope.showAddCustomer = () => {
		$scope.newCustomer = {
			name: '',
			location: ''
		};
		$scope.action = 'add';
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
		let url = URL_UPDATE_CUST + `customerId=${$scope.customerToUpdate.custId}&custName=${$scope.customerToUpdate.custName}&custLocation=${$scope.customerToUpdate.custLocation}`;

		$http.get(url).then(function (response) {
			let newRawLoc = response.data;
			let i = $scope.customers.findIndex((e) => e.custId === $scope.customerToUpdate.custId);
			let location = $scope.locations.find((e) => e.locId == newRawLoc.custLocation);
			console.debug(i, $scope.customers);
			$scope.customers[i].custName = newRawLoc.custName;
			$scope.customers[i].custLocation = String(newRawLoc.custLocation);
			$scope.customers[i].locAddress = location.locAddress;
			$scope.customers[i].city = location.city;
			$scope.customerToUpdate = null;
			$scope.action = null;
		});
	}


	$scope.cancel = () => {
		$scope.action = null;
		$scope.customerToUpdate = null;
		$scope.newCustomer = {
			name: '',
			location: ''
		};
	}



});

