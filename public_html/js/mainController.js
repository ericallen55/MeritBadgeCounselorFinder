//Images created by Nicolas Mollet https://mapicons.mapsmarker.com/author/nico.mollet/

var app = angular.module('meritBadgeConselor');
app.controller('mainController', function ($scope, mapService, firebaseService, uiGmapGoogleMapApi, uiGmapIsReady) {

    $scope.address = '2358 N 2930 W, Clinton, UT';
    $scope.markers = [];


    //waits for google and then creates the initial map, also sets up the options.
    uiGmapGoogleMapApi.then(function (maps) {
        $scope.googlemap = {};
        mapService.codeAddress($scope.address).then(function (data) {
            $scope.map = {
                center: {latitude: data.k, longitude: data.B},
                zoom: 11,
                options: {
                    mapTypeId: google.maps.MapTypeId.HYBRID
                }
            };
            $scope.windowOptions = {
                show: false,
                options: {
                    pixelOffset: new google.maps.Size(0, -35, 'px', 'px')
                }
            };
        });
    });

    //calls firebase to get a list of merit badges
    $scope.getMeritBadges = function () {
        firebaseService.getMeritBadges().then(function (data) {
            $scope.meritBadges = data[0];
        });
    }();
    
    //creates a marker
    var createMarker = function (data) {
        var marker = {
            latitude: data.location.k,
            longitude: data.location.B,
            id: data.id,
            icon: "data:image/png;base64," + $scope.meritBadgeSelected.icon,
            show: false,
            options: {
                name: data.person.name,
                address: data.person.address,
                homePhone: data.person.homePhone,
                buisnessPhone: data.person.buisnessPhone,
                troopOnly: data.person.troopOnly
            }
        };
        return marker;
    };
    
    //Sets the center of the map to the home address.
    $scope.setAddress = function () {
        mapService.codeAddress($scope.address).then(function (data) {
            $scope.home = {
                latitude: data.k,
                longitude: data.B,
                title: 'home',
                id: $scope.markers.length,
                icon: "data:image/png;base64," + "iVBORw0KGgoAAAANSUhEUgAAACAAAAAlCAYAAAAjt+tHAAAD4UlEQVRYhcWXzWsbRxiHH602a3mtVSUh165pFwVCU0M/qBsopYH2sIYE0Z58Cjo1l15SSi6+pkdBDv4j3ENvoWBIkC4plBbqUNpSeoxZcBpbiaxKqiSvpVUPO7NdSauv1KIvDDOanZnfM++8O9o30uv1ANjc3FQBBdBErXK+1gFcwAHcYrHYAYj0ej0prgExUTQBoJyTuCsAHKAtilMsFjsRy7KkuA4kRB1jPh5oA02gJmpH7jImxF8u5Eo/nLNwn23vWR+Ipgt0IpZlxYV4upAr/ZbNZtB1jVjswrkKt9tnNJsOBwfP2N6z3gIqQC0YeDFgLuLA4JoyzhQZ7bLMRTwEwteUUX5e0T6LKS8kXKvV+oq0o6Ojvnomimmt1WpRr9dx127irt2kXq/TarUAOD09hbe/8eoZbKp3vdvt4rou5XKZ2No14pdvAeBUf6f85D4LCwvewOT7Xr/jEI1GiUajE9ee6AHbtmk2mxw9P0U1LrH88beoSybqkum1jUuc9ZbIfHQPgAsvvclxFQ4PD7Ft+78B2LbNysoKRu45+sUbrF7fJ6Ko2LsK9q5CRFFZvb6PfvEG+mufAvDKJ7/y6tYTzLzrr/FCALZtk8lkWNj8k6cPrpJYv42iJQAw864voGgJEuu3efrg6tAa00CEAsgJ+rVjyg+3SG3cRY1nRy6ixrOkNu5Sfrg1M8QQQLVaxTAMf2JE1VHjWd/tQGhbjWeJqHqoiJl3MQyDk5OTYfjBjmQyyV/Jz6j9sQOAlt4gurgqWN1QAVCILq6ipTf8eYMWff0rEuUdHj+u9fUPAVSrVWr2Hd8D/+6i07ejsHZi/csRgJ6nuoYx1B/qAXnDSTebeRf7aw16Ha8d7A+0g3P64b1nqVRqyAPT34S9zuQxwlJXdjDzLqkr4ccRtLE34ShXjxojzXjjC78+2R99LDCnf8HKj59j7ypUfhovDmM8EHaW045JO/fpLi6Sbt2jAfBddjYA0zQnik+y5eXlvrVGrfl/fIiEAoy6YeZprgToBArt9tncFANr+5ryfpUZC82mMxcI+VkufwpNN2JZlgbEgSRjEpNsNkM6vTSVWKXyNwcHz0KficTkGKgCDRXPA228dEkmDcHUTAEo5ErfAxMhpPj2nvWh6JLxNZiatQF3muTU/4Yv5EqPxnkiIP4e/bE1OjmdkJ7LWsLphVzp5zCIgPi7YpfynIMA4en5OBNgMbw4iQuIX4IQAfF3hHhDlLYUGmUTAUZAxKUngODOG8wgPjVACERCQDwC5Jk38IJravGZAAYgdFE08cjBc31zFvGZAQIQMijlqypfMWcWcYB/AOpB1zuYmpKZAAAAAElFTkSuQmCC",
                show: false,
                options: {
                    name: 'Your house'
                }
            };
            $scope.markers.push($scope.home);
        });
    };
    //Gets the counselors for the selected merit badge
    $scope.setMeritBadge = function (meritBadge) {
        $scope.meritBadgeSelected = meritBadge;
        $scope.markers = [];
        if ($scope.home) {
            $scope.markers.push($scope.home);
        }
        firebaseService.getCounselors($scope.meritBadgeSelected).then(function (data) {
            $scope.counselors = data;
            console.log('$scope.counselors', $scope.counselors);
            for (i = 0; i < $scope.counselors.length; i++) {
                if ($scope.counselors[i].location) {        //if we have the location no need to code it
                    var marker = {
                        person: $scope.counselors[i],
                        location: $scope.counselors[i].location,
                        id: $scope.markers.length
                    };
                    $scope.markers.push(createMarker(marker));
                }
                else {
                    mapService.codeMarker($scope.counselors[i], i + 1).then(function (data) {
                        data.person['location'] = data.location;
                        firebaseService.setCounselor(data); //create a location key and set it in the data base
                        $scope.markers.push(createMarker(data));
                    });
                }
            }
            if($scope.markers.length < 2){
                alert("There are no counselors for that badge in your district");
            }
        });
    };
    
    //Events for the markers
    $scope.markersEvents = {
        click: function (marker, eventName, model, args) {
            if ($scope.currentMarker === marker) {
                $scope.windowOptions.show = !$scope.windowOptions.show;
            }
            else {
                $scope.windowOptions.show = true;
            }
            $scope.currentMarker = marker;
        }
    };
});


