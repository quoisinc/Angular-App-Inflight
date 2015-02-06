var jbifsaServices = angular.module('jbifsaServices', []);

jbifsaServices.factory("Crewmember", function ($rootScope, presentationServiceURL, $http) {
    
    jbRPCImpl.$http = $http;

    var crewmemberFactory = {
        authenticated: false,
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        isAuthenticated: function () {
            return this.authenticated;
        },
        getFullName: function () {
            return this.firstName + " " + this.lastName;
        },
        logIn: function (userID, password) {

            var self = this;
            self.userName = userID;
            self.password = password;

            if ((userID === undefined || userID.length <= 0) || (password === undefined || password.length <= 0)) return;

            $(".loadingImg").show();

            var handleSuccess = function (data) {
                self.setCrewmember(data);
                $(".loadingImg").hide();
            };

            var handleError = function (xhr) {
                $(".loadingImg").hide();
            };

            var crewmemberRequestData = {
                consumerId: "inflight",
                dataType: "CREWMEMBER",
                version: "1",
                crewmemberRequest: {
                    crewId: "",
                    password: "",
                    username: userID
                }
            };

            crewmemberRequestData = window.JSON.stringify(crewmemberRequestData);

            jbRPCImpl.callJSONHTTPAuth(handleSuccess, handleError, presentationServiceURL, crewmemberRequestData, userID, password);
            //jbNavigationController.proceedLogin(true, "Foo", "Bar");//By-passing service call for local testing  
        },
        crewmemberUpdated: function () {
            $rootScope.$broadcast('crewmemberChanged');
        },
        setCrewmember: function (data) {

            if (data) {
                this.firstName = data.crewmemberResponse.firstName;
                this.lastName = data.crewmemberResponse.lastName;
                this.authenticated = true;
                
                this.crewmemberUpdated();
            }
        }
    };

    return crewmemberFactory;
});

jbifsaServices.factory("FlightSearch", function ($rootScope, presentationServiceURL) {

    var flightSearchFactory = {
        origin: '',
        destination: '',
        flightNumber: '',
        flightDate: '',
        presentationServiceResponse: {},
        getFlightManifest: function (userName, password, origin, destination, flightNumber, flightDate) {
            //if ($has.connection) {

            //if ($('form#flightSearchForm').valid()) {
            var self = this;
            $(".loadingImg").show();

            var handleSuccess = function (data) {
                self.setManifestData(data);
                $(".loadingImg").hide();
            };

            var handleError = function (xhr) {
                $(".loadingImg").hide();
            };

            var flightDataRequest = {
                consumerId: "inflight",
                dataType: "MANIFEST",
                version: "1",
                manifestRequest: {
                    origin: origin.toUpperCase().trim(),
                    destination: destination.toUpperCase().trim(),
                    flightNumber: flightNumber.trim(),
                    flightDate: flightDate + "T00:00"
                }
            };

            flightDataRequest = window.JSON.stringify(flightDataRequest);
            flightDataReqHolder = flightDataRequest;

            var gotCredentials = function (key, value) {
                jbNavigationController.loadPassengerList(flightDataRequest, key, value);
            };
            var failedToGetCredentials = function (key, error) {
                navigator.notification.alert("GET FAIL - Key: " + key + " Error: " + error, new function alertCallback() { }, "Error");
            };

            //Add this - just for debugging in desktop mode
            //if (device === undefined){
            //	var device ={
            //  		platform : 'desktop mode'
            //  }		          
            // }
            //End


             //if null fallback to local mode
             //if (device.platform !== null) {                        
            //	window.plugins.keychain.getForKey(storedUserName, IFServiceAssistant.config.keychainService, gotCredentials, failedToGetCredentials);
            // } else {                                
            jbRPCImpl.callJSONHTTPAuth(handleSuccess, handleError, presentationServiceURL, flightDataRequest, userName, password);
            // }
            //}

            //}
        },
        setManifestData: function (data) {
            if (data) {
                this.presentationServiceResponse = data;                
                this.receivedResponse();
            }
        },
        receivedResponse: function () {
            $rootScope.$broadcast('flightManifestDataChanged');
        }
    };

    return flightSearchFactory;
});
