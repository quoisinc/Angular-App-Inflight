 //generic class for remote calls
 
 
 jbRPC = function () { 

    var self = this;

    this.$http = {};

    this.EVENTS = {
        /* 'DATA_LOADED': jQuery.Event('DATA_LOADED'),*/
        'DATA_LOADED': 'DATA_LOADED',
        'ERROR' : 'ERROR'
    };

    this.callPOST = function (gatewayURL, params, id) {
      
        if (typeof (id) == null || typeof (id) == "undefined") {
            id = '';
        }

        var callBackID = id + Math.floor(Math.random() * 2000)
        console.log("jbRPC:callPOST  " + gatewayURL);
        $.ajax({
                type: "POST",
                url: gatewayURL,
                data: params,
                contentType: "application/x-www-form-urlencoded",
                dataType: "jsonp",
                jsonpCallback: 'callback' + callBackID,
                success: function (data) {
                    $(self).trigger(self.EVENTS.DATA_LOADED, [data]);
                },
                error: function (xhr, status, error) {
                    console.log("X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X ERROR : " +
                gatewayURL + ' xhr:' + xhr + " status: " + status + " error: " + error);
                },
                crossDomain: true,
                async: true,
                cache: false
        }); 

    }


    this.call = function (serviceURL) {
     
        console.log("jbRPC:call  " + serviceURL);
        $.ajax({

            type: 'GET',
            url: serviceURL,
            contentType: "application/json; charset=utf-8",  
            success: function (data) { 
                $(self).trigger(self.EVENTS.DATA_LOADED, [data]);
            },
            error: function (xhr, status, error) {
                console.log("X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X ERROR : " + 
                serviceURL + ' xhr:' + xhr + " status: " + status + " error: " + error);
            },
            crossDomain: true,
            async: true,
            cache: false 
        });

    }

    this.callJSONP = function (serviceURL, id) {
     
        if (typeof (id) == null || typeof (id) == "undefined") {
            id = '';
        }

        var callBackID = id + Math.floor(Math.random() * 2000)
        console.log("jbRPC:callJSONP " + serviceURL);
        $.ajax({

            type: 'GET',
            url: serviceURL,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            jsonpCallback: 'callback' + callBackID,
            success: function (data) {
               
                $(self).trigger(self.EVENTS.DATA_LOADED, [data]);
            },
            error: function (xhr, status, error) {
                console.log("X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X ERROR : " + serviceURL + ' xhr:' + xhr + " status: " + status + " error: " + error);
            },
            crossDomain: true,
            async: true,
            cache: false

        });

    }

    this.callJSONPAdAuthentication = function (serviceURL, userID, password) {

        //Authenticate user
        $.ajax({
            type: "POST",
            async: false,
            url: serviceURL,
            jsonpCallback: '$callback',
            contentType: "application/json; charset=utf-8",
            timeout: 2000,
            dataType: 'jsonp',
            data: { username: userID, password: password },
            success: function (data) {
                
                $(self).trigger(self.EVENTS.DATA_LOADED, [data]);
            },
            error: function (xhr, status, error) {
               //alert("An error has occurred. Please try again.");
                console.log("X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X ERROR : " + serviceURL + ' xhr:' + xhr + " status: " + status + " error: " + error);
               $(self).trigger(self.EVENTS.ERROR, [xhr]);
            } 
        });

    }

    this.callJSONHTTPAuth = function (serviceURL, requestParams, userID, password) {

        //Authenticate user
        $.ajax({
            type: "POST",
            url: serviceURL,
            contentType: "application/json",
            timeout: 123000,
            dataType: 'json',
            data: requestParams,
            crossDomain: true,
            beforeSend: function (xhr) {

                var hash = CryptoJS.enc.Latin1.parse(userID + ":" + password);
                var base64 = CryptoJS.enc.Base64.stringify(hash);

                xhr.setRequestHeader("Authorization", "Basic " + base64);
            },
            success: function (data) {
               $(self).trigger(self.EVENTS.DATA_LOADED, [data]);
            },
            error: function (xhr, status, error) {
                console.log("X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X ERROR : " + serviceURL + ' xhr:' + xhr + " status: " + status + " error: " + error);
                $(self).trigger(self.EVENTS.ERROR, [xhr]);
            }
        });

    }

    this.callJSONHTTPAuth = function (handleSuccessData, handleErrorData, serviceURL, requestParams, userID, password) {
        
        var hash = CryptoJS.enc.Latin1.parse(userID + ":" + password);
        var base64 = CryptoJS.enc.Base64.stringify(hash);

        self.$http({
            method: 'POST',
            url: serviceURL,
            data: requestParams,
            timeout: 123000,
            headers: { 'Authorization': "Basic " + base64 }
        }).
        success(function (data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
              handleSuccessData(data);
        }).
        error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              handleErrorData(data);
        });

    }
    
    //this.callJSONPPassengerList = function (serviceURL, originParam, destinationParam, flightNumberParam, flightDateParam, userId, password) {
    this.callJSONPPassengerList = function (serviceURL, flightDataRequest) {  
    	    	
        $.ajax({
            type: "POST",
            async: true,
            url: serviceURL,
            cache: false,
            contentType: "application/json",
            timeout: 15000,
            dataType: 'json',
            data: flightDataRequest,
            crossDomain: true,
            success: function (data) {

                $(self).trigger(self.EVENTS.DATA_LOADED, [data]);
            },
            error: function (xhr, status, error) {
                //alert("An error has occurred. Please try again.");
                console.log("X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X ERROR : " + serviceURL + ' xhr:' + xhr + " status: " + status + " error: " + error);
               $(self).trigger(self.EVENTS.ERROR, [xhr]);
            }
        });

    }

}

var jbRPCImpl = new jbRPC();
console.log("ADDED_TO_DOM jbRPC");

 $(window).trigger('ADDED_TO_DOM', "jbRPC");

if (typeof (jQuery) != null && typeof (jQuery) != 'undefined') {
  //  $(window).trigger(jQuery.Event('ADDED_TO_DOM'), "jbRPC");
} else {
console.log("x x x x x x x x x x x x x x x x x ERROR : can not dispatch  - no jquery");
}
 

