
jbifsaControllers.controller('PortalCtrl', ['$scope', '$location', 
  function ($scope, $location) {     
      
      $scope.goToflightSearch = function () {
          $location.path("flightSearch");
      }

  }

]);