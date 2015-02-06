
jbifsaControllers.controller('ManifestCtrl', ['$scope', '$window', 'FlightSearch',
  function ($scope, $window, FlightSearch) {
      $scope.manifest = FlightSearch.presentationServiceResponse;

      $scope.$on('flightManifestDataChanged', function () {
          $scope.manifest = FlightSearch.presentationServiceResponse;
      });

      $scope.isManifestView = function () {
          if ($window.location.href.toLowerCase().indexOf("manifest") >= 0) {
              return true;
          } else {
              return false;
          }
      }         

      $scope.$on('$routeChangeSuccess', function () {

          var passengerList = new dhxPassengerList(FlightSearch.presentationServiceResponse.manifestResponse.seats);          
          var seatMap = new dhxSeatMap(FlightSearch.presentationServiceResponse.manifestResponse.seats);
          var passengerDetails = new dhxSeatDetails(FlightSearch.presentationServiceResponse);

          if ($("div[view_id='passengerView']").length == 0) {
              dhx.ui(passengerList);             
              dhx.ui(seatMap);
              dhx.ui(passengerDetails);
          }
      });
      
          //});
      //});
  }
]);