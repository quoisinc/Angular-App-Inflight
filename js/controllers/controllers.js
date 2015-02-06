var jbifsaControllers = angular.module('jbifsaControllers', []);

jbifsaControllers.controller('SubTitleAreaCtrl', ['$scope', '$window','$location', 'FlightSearch',
function ($scope, $window, $location, FlightSearch) {

      $scope.goBack = function () {
          $window.history.back();         
      }

      $scope.flightManifest = FlightSearch.presentationServiceResponse;

      $scope.$on('flightManifestDataChanged', function () {
          $scope.flightManifest = FlightSearch.presentationServiceResponse;
      });

      $scope.isManifestView = function () {
          if ($window.location.href.toLowerCase().indexOf("manifest") >= 0) {
              return true;
          } else {
              return false;
          }
      }
  }
]);

jbifsaControllers.controller('HeaderUserInfo', ['$scope', '$window', 'Crewmember',
  function ($scope, $window, Crewmember) {

      $scope.crewmemberFirstName = '';

      $scope.$on('crewmemberChanged', function () {
          $scope.crewmemberFirstName = Crewmember.firstName;
      });
      
  }
]);