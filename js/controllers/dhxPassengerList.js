dhxPassengerList = function (passengerData) {

    var passengerList = {
        id: 'passengerView',
        container: 'manifest',
        //template: $("div[ng-controller='ManifestCtrl']"),
        rows: [
                {
                    view: "toolbar",
                    type: "SubBar",
                    width: 317,
                    css: "searchBarCSS",
                    template: '<div id="searchContainer"></div>',
                    elements: [
                        {
                            id: "filter",
                            view: "text",
                            label: "<div class='dhx_el_icon'><div class='dhx_el_icon_search' style='margin: 5px 0'></div></div>",
                            labelWidth: 30,
                            placeholder: "Search"
                        }
                    ]
                },
            {
                view: "list",
                id: "passengerList",
                css: "passengerList_container",
                select: true,
                sort: {
                    by: "#id"
                },
                template: function (obj) {

                    if (obj.pax != null) {

                        var seatClass = (obj.pax.lastName != null && obj.pax.lastName.length === 0) ? "paxlist_empty" : "";
                        var iconimgs = "";
                        var ssrString = (obj.pax.ssr != null && obj.pax.ssr.length > 0) ? obj.pax.ssr : "";

                        if (obj.pax.trueblueNumber.length > 0) {
                            seatClass = (obj.pax.isMosaic) ? "paxlist_mosaic" : "paxlist_tb";
                            iconimgs = (obj.pax.isMosaic) ? "<div class='icons paxlist_icn_tb'></div><div class='icons paxlist_icn_mosaic'></div>" : "<div class='icons paxlist_icn_tb'></div>";
                        }

                        return '<span class="' + seatClass + '"></span><div><div class="passengerList_name">' + ((obj.pax.lastName.length > 0) ? obj.pax.lastName + ", " + obj.pax.firstName : "Empty Seat") + '</div><div class="passengerSeat_Num">' + obj.seatNumber + '</div></div><div class="passengerList_icon">' + iconimgs + '<span>' + ssrString + '</span></div>';
                    } else {
                        return '<span class="paxlist_empty"></span><div><div class="passengerList_name">Empty Seat</div><div class="passengerSeat_Num">' + obj.seatNumber + '</div></div><div class="passengerList_icon"></div>';
                    }

                },
                data: passengerData
            }
        ]
    }

    return passengerList;
}