var appIFServiceAssistant = angular.module("appIFServiceAssistant", ["ngRoute", "ngAnimate", "ifsaConfig", "jbifsaServices", "jbifsaControllers"]);

appIFServiceAssistant.config(function ($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider.
      when('/', {
          templateUrl: 'partials/loginView.html',
          controller: 'LoginCtrl'
      }).
      when('/portal', {
          templateUrl: 'partials/portalView.html',
          controller: 'PortalCtrl'
      }).
      when('/flightSearch', {
          templateUrl: 'partials/flightSearchView.html',
          controller: 'FlightSearchCtrl'
      }).
      when('/manifest', {
          templateUrl: 'partials/manifestView.html',
          controller: 'ManifestCtrl'
      }).
      otherwise({
          redirectTo: '/'
      });

});
