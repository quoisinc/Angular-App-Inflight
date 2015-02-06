dhxSeatDetails = function (manifestData) {

    var seatDetails = [{
        //view: "pagelist",
        css: "passengerDetail swiper-container",
        id: "passengerDetail",
        container: "seatDetailsContainer",
        scroll: "x",
        width: 711,
        type: {
            width: 712,
            height: 553,

            flightInfo: function (obj) {
                return "Flight " + obj.flightNumber + " " + obj.origin + " - " + obj.destination;
            },

            isEmptySeat: function (obj) {
                return (obj.pax != null && obj.pax.firstName.length > 0) ? "" : "passDetails_emptySeat";
            },

            paxName: function (obj) {
                return (obj.pax != null && obj.pax.firstName.length > 0) ? obj.pax.lastName + ", " + obj.pax.firstName : "Empty Seat";
            },

            paxNameFirstLast: function (obj) {
                return (obj.pax != null && obj.pax.firstName.length > 0) ? obj.pax.firstName + " " + obj.pax.lastName : "Empty Seat";
            },

            paxPNR: function (obj) {
                return (obj.pax != null && obj.pax.pnr.length > 0) ? obj.pax.pnr : "No remarks found";
            },

            paxTrueblue: function (obj) {
                return (obj.pax != null && obj.pax.trueblueNumber.length > 0) ? "<li class=\"lrgli\"><div>TrueBlue Member</div> <div class='icons paxlist_icn_tb'></div></li>" : "";
            },

            paxMosaic: function (obj) {
                return (obj.pax != null && obj.pax.isMosaic) ? "<li class=\"lrgli\"><div>Mosaic Member</div> <div class='icons paxlist_icn_mosaic'></div></li>" : "";
            },

            paxConnecting: function (obj) {
                return (obj.pax != null && obj.pax.isConnecting) ? (obj.pax.connectingFlight.destination != null && obj.pax.connectingFlight.destination.length > 0) ? "Customer is connecting to " + obj.pax.connectingFlight.destination : "Information is not available." : "No connecting flight";
            },

            paxSSR: function (obj) {
                return (obj.pax != null && obj.pax.ssr > 0) ? obj.pax.ssr : "No SSR found";
            },

        },
        template: "html->passengerDetailTmpl",
        panel: false,
        data: manifestData,
        datatype: "json",
        on: {
            'onafterrender': function (e) {
                //console.log(e);
                $('.swiper-container>.dhx_scroll_cont').addClass('swiper-wrapper').attr('touch_scroll', 'y');
                $('.swiper-container .dhx_list_item').addClass('swiper-slide');

                mySwiper = $('.swiper-container').swiper({
                    mode: 'horizontal',
                    loop: false,
                    onSlideChangeEnd: function (e) {
                        var activeID = $(e.slides[e.activeSlide]).attr('dhx_l_id');
                        var activeElement = $('div[dhx_l_id=' + activeID + ']');
                        $('.dhx_list__item_selected:not(div[dhx_l_id=' + activeID + '])').removeClass('dhx_list__item_selected');
                        $$('passengerList').select(activeID);
                        setEvenMoreSpaceClass();
                    }
                });
            }
        }
    }]

    return seatDetails;
}

dhxSeatMap = function (manifestData) {
    var seatMap = {
        container: "seatMapContainer",
        view: "pagelist",
        id: "seatMap",
        scroll: "y",
        type: {
            height: 68,
            width: 88
        },
        datatype: "json",
        data: manifestData,
        select: true,
        css: "seatMap a320",
        template: "html->landscapeContainerViewTmpl"
    };

    return seatMap;
}


var setEvenMoreSpaceClass = function () {
    //add even more space row class
    $('.a320.seatMap .dhx_list_item:nth-child(6n+3) div.evenMoreSpace').parent().addClass("evenMoreSpaceRowRight");
    $('.a320.seatMap .dhx_list_item:nth-child(6n+4) div.evenMoreSpace').parent().addClass("evenMoreSpaceRowLeft");

    $('.e190.seatMap .dhx_list_item:nth-child(4n+2) div.evenMoreSpace').parent().addClass("evenMoreSpaceRowRight");
    $('.e190.seatMap .dhx_list_item:nth-child(4n+3) div.evenMoreSpace').parent().addClass("evenMoreSpaceRowLeft");
}