(function () {
    'use strict';

    angular.module("myApp")
        .directive("nwCard", function () {
            return {
                restrict: "E",
                templateUrl: "templates/directives/nw-card.html",
                controller: ['$scope', 'Complaint', function ($scope, Complaint) {
                    $scope.complaints = [];
                    Complaint.all()
                        .then(function (response) {
                            $scope.complaints = response.data;
                        });
                }]
            }
        })
})();