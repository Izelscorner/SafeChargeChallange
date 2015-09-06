'use strict';



angular.module('ccProcessing').controller('creditCardProcessingCtrl', function($scope, ccService, $state) {

    if (ccService.getCcDetails() !== null) {
        $scope.month = ccService.getCcDetails().month;
        $scope.year = ccService.getCcDetails().year;
        $scope.ccNumber = ccService.getCcDetails().ccNumber;
        $scope.cvv = ccService.getCcDetails().cvv;
        $scope.fullName = ccService.getCcDetails().fullName;
    } else {
        $scope.month = 'Jan';
        $scope.year = '2015';
        $scope.ccNumber = '';
        $scope.cvv = '';
    }



    var validationMap = {
        4: "fa fa-cc-visa",
        5: "fa fa-cc-mastercard",
        0: "fa fa-exclamation"
    };
    $scope.validateCreditCard = function() {
        if ($scope.ccNumber != null && $scope.ccNumber > 0) {
        	var ccCardString = $scope.ccNumber.toString()
            var firstChar = parseInt(ccCardString.charAt(0));



            switch (firstChar) {
                case 4:
                    $scope.ccPaymentForm.ccNumber.$setValidity("validCard", true);
                    return validationMap[4];
                case 5:
                    $scope.ccPaymentForm.ccNumber.$setValidity("validCard", true);
                    return validationMap[5];
                default:
                    $scope.ccPaymentForm.ccNumber.$setValidity("validCard", false);
                    return validationMap[0];
            }

            if(ccCardString.length !== 16){
            	$scope.ccPaymentForm.ccNumber.$setValidity("validCard", false);
            }

        }
    };
    $scope.submitted = false;
    $scope.processCreditCard = function(form) {
        $scope.submitted = true;

        if (form.$valid) {

            ccService.setCcDetails({
                fullName: $scope.fullName,
                ccNumber: $scope.ccNumber,
                month: $scope.month,
                year: $scope.year,
                cvv: $scope.cvv
            });

            $state.go('summary');
        }
    };

});


