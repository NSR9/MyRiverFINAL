(function () {
    'use strict'

    angular.module('myApp')
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when("/complaints", {
                templateUrl: "templates/public/complaint/index.html",
            })
                .when("/new-complaint", {
                    templateUrl: "templates/public/complaint/new.html",
                    controller: "ComplaintFormController"
                })
                .when("/complaints/:complaintId", {
                    templateUrl: "templates/public/complaint/show.html",
                    controller: showController,
                });

            showController.$inject = ['$scope', 'Complaint', '$routeParams'];

            function showController($scope, Complaint, $routeParams) {
                Complaint.all().then(function (response) {
                    console.log($routeParams.complaintId, response.data);
                    for (index in response.data) {
                        if (response.data[index].complaintId == $routeParams.complaintId) {
                            $scope.activeComplaint = response.data[index];
                            console.log($scope.activeComplaint);
                            break;
                        }
                    }
                });
            }
        }])
})();