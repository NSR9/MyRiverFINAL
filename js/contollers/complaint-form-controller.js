(function () {
    'use strict';

    angular.module("myApp")
        .controller("ComplaintFormController", ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
            $scope.isLocation = false;
            $scope.coordinates = [];
        
            // var payload = new FormData();

            $scope.nextStep = function () {
                $scope.isLocation = !($scope.isLocation);
            }

            $scope.formData = {};
            console.log($scope.formData);
            $scope.submitComplaint = function (files) {
                console.log(files);
                // for(var index = 0; index < files.length; index++){
                //     payload.append('photos', files[index]);
                // }
                // payload.append('data', $scope.formData);
                // console.log(payload);
                if (files && files.length) {
                    Upload.upload({
                        url: "http://localhost:3000/public/complaints/newComplaint",
                        data: {
                            files: files,
                            data: $scope.formData
                        },
                        method: "POST",
                        headers: {
                            'Content-Type': undefined,
                            //'enctype': 'multipart/form-data',
                        }
                    }).then(function (response) {
                        $timeout(function () {
                            console.log(response.data);
                        });
                    });
                }
            };
            console.log($scope.imgData);
        }]);
})();