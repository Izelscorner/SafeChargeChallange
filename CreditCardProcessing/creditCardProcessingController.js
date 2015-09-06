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
        if ($scope.ccNumber != null && $scope.ccNumber.length > 0) {
            var firstChar = parseInt($scope.ccNumber.charAt(0));

            switch (firstChar) {
                case 4:
                    return validationMap[4];
                case 5:
                    return validationMap[5];
                default:
                    $scope.ccPaymentForm.ccNumber.$setValidity("validCard", false);
                    return validationMap[0];
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

// angular.module('ccProcessing').directive('validCreditCard', function() {
//     return {
//         require: 'ngModel',
//         link: function(scope, elm, attrs, ctrl) {
//             ctrl.$validators.validCreditCard = function(modelValue, viewValue) {
//                 var isnum = /^\d+$/.test(viewValue);

//                 if (!isnum) {
//                     return false;
//                 }
//                 if (ctrl.$isEmpty(modelValue)) {
//                     return false;
//                 }
//                 if (viewValue.length != 16) {
//                     return false;
//                 } else {
//                     if (viewValue.charAt(0) == 4 || viewValue.charAt(0) == 5)
//                         return true;
//                 }
//                 // it is invalid
//                 return false;
//             };
//         }
//     };
// });
