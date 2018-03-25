(function () {
    'use strict';

    angular.module("myApp")
        .factory("Complaint", ["$http", function ($http) {
            return {
                all: function () {
                    return $http.get("complaints.json");
                }
            };
        }]);
})();