
jbifsaControllers.controller('FlightSearchCtrl', ['$scope', '$window', '$location', 'FlightSearch', 'Crewmember',
function ($scope, $window, $location, FlightSearch, Crewmember) {

      //Initialize values. Populate with previous values.
      $scope.flightSearch = {};
      $scope.flightSearch.origin = FlightSearch.origin == '' ? '' : FlightSearch.origin;
      $scope.flightSearch.destination = FlightSearch.destination == '' ? '' : FlightSearch.destination;
      $scope.flightSearch.flightNumber = FlightSearch.flightNumber == '' ? '' : FlightSearch.flightNumber;

      var now = new Date();
      var day = ('0' + now.getDate()).slice(-2);
      var month = ('0' + (now.getMonth() + 1)).slice(-2);

      var today = now.getFullYear() + "-" + month + "-" + day;
      $scope.flightSearch.flightDate = FlightSearch.flightDate == '' ? today : FlightSearch.flightDate;

      $scope.goToManifest = function () {

          FlightSearch.origin = this.flightSearch.origin;
          FlightSearch.destination = this.flightSearch.destination;
          FlightSearch.flightNumber = this.flightSearch.flightNumber;
          FlightSearch.flightDate = this.flightSearch.flightDate;

          FlightSearch.getFlightManifest(Crewmember.userName, Crewmember.password, FlightSearch.origin, FlightSearch.destination, FlightSearch.flightNumber, FlightSearch.flightDate);
          
          $scope.$on('flightManifestDataChanged', function () {
              $location.path("manifest");              
          });
      }

  }
]);