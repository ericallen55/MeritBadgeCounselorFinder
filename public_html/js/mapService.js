var app = angular.module('meritBadgeConselor');

app.service('mapService', function ($q) {


    this.codeAddress = function (address) {
        var geocoder = new google.maps.Geocoder();
        var deferred = $q.defer();

        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK)
            {
                return deferred.resolve(results[0].geometry.location);
            }
            return deferred.reject();
        });
        return deferred.promise;
    };

    this.codeMarker = function (person, id) {
        var geocoder = new google.maps.Geocoder();
        var deferred = $q.defer();

        geocoder.geocode({'address': person.address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK)
            {
                return deferred.resolve({
                    person: person,
                    location: results[0].geometry.location,
                    id: id
                });
            }
//            console.log('google.maps.GeocoderStatus', google.maps.GeocoderStatus)
            return deferred.reject();
        });
        return deferred.promise;
    };
});
