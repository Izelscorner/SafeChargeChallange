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
        3: "fa fa-cc-amex",
        6: "fa fa-cc-discover",
        0: "fa "
    };
    $scope.validateCreditCard = function() {

        if ($scope.ccNumber) {
            var ccCardString = $scope.ccNumber.toString()
            var firstChar = parseInt(ccCardString.charAt(0));
            var secondChar = parseInt(ccCardString.charAt(1));


            switch (firstChar) {
                case 4: //Visa
                    ccCardString.length === 16 ? $scope.ccPaymentForm.ccNumber.$setValidity("validCard", true) : $scope.ccPaymentForm.ccNumber.$setValidity("validCard", false);
                    return validationMap[4];
                case 5: //MasterCard
                    ccCardString.length === 16 ? $scope.ccPaymentForm.ccNumber.$setValidity("validCard", true) : $scope.ccPaymentForm.ccNumber.$setValidity("validCard", false);
                    return validationMap[5];
                case 3: //Amex
                    if (secondChar === 4 || secondChar=== 7) {
                        ccCardString.length === 15 ? $scope.ccPaymentForm.ccNumber.$setValidity("validCard", true) : $scope.ccPaymentForm.ccNumber.$setValidity("validCard", false);
                        return validationMap[3];
                    }else{
                    	$scope.ccPaymentForm.ccNumber.$setValidity("validCard", false);
                    	return validationMap[0];
                    }
                case 6: //Discovery
                    ccCardString.length === 16 ? $scope.ccPaymentForm.ccNumber.$setValidity("validCard", true) : $scope.ccPaymentForm.ccNumber.$setValidity("validCard", false);
                    return validationMap[6];
                default:
                	$scope.ccPaymentForm.ccNumber.$setValidity("validCard", false); 
                	return validationMap[0];
            }

        } else {
            return validationMap[0];
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
