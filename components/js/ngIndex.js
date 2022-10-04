locApp = angular.module('angLocApp', []);

locApp.controller('IndexController', ($scope, $http) => {



	$scope.goTo = (route) => {
		document.location = document.location.origin + "/" + route;
	}

});

