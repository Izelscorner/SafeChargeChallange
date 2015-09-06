'use strict';

angular.module('ccProcessing').controller('sumarryCtrl', function($scope,ccService) {
	$scope.ccDetails = ccService.getCcDetails();
})
