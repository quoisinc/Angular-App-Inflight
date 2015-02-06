
jbifsaControllers.controller('LoginCtrl', ['$scope', '$location', 'Crewmember',
  function ($scope, $location, Crewmember, presentationServiceURL) {

      $scope.loginUser = function (user) {
     
          var userID = user.userID;
          var password = user.password;

          Crewmember.logIn(userID, password);

          $scope.$on('crewmemberChanged', function () {              
              $location.path("portal");              
          });
          
      }
      
  }
]);