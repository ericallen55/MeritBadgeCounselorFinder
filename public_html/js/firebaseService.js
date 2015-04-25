var app = angular.module('meritBadgeConselor');

app.service('firebaseService', function ($firebaseArray, $firebaseObject, $q) {

    var firebaseUrl = 'https://meritbadgefinder.firebaseio.com/Head/';
    this.getMeritBadges = function () {
        var deferred = $q.defer();
        deferred.resolve($firebaseArray(new Firebase(firebaseUrl + 'meritBadges/')).$loaded().then(function (data) {
            return data;
        }));
        return deferred.promise;
    };

    //Adds a new counselor to Firebase
    this.setCounselor = function (counselor) {
        this.updateCounselor(counselor).then(function (data) {
            var fbArray = data;
            var update = false;
            for (i = 0; i < fbArray.length; i++) {
                if (fbArray[i].name === counselor.person.name &&
                        fbArray[i].address === counselor.person.address &&
                        fbArray[i].phone === counselor.person.phone) {
                    update = true;
                    break;
                }
            }
            //if the person already exsists just update their data
            if (update) {                
                fbArray[0] = counselor.person;  //no clue why this works or why i need it, but just save didn't work so unless i set the array
                fbArray.splice(1, fbArray.length);
                fbArray.$save(counselor.person);
            }   //if they don't exsist add them.
            else {
                fbArray.$add(counselor.person);
            }
        });
    };

    this.getCounselors = function (counselor) {
        var deferred = $q.defer();
        deferred.resolve($firebaseArray(new Firebase(firebaseUrl + '/counselors' + '/' + counselor.badge)).$loaded().then(function (data) {
            return data;
        }));
        return deferred.promise;
    };

    this.updateCounselor = function (counselor) {
        var deferred = $q.defer();
//        console.log('getCounselors', counselor);
//        console.log('locatoin', firebaseUrl + '/counselors' + '/' + counselor.person.badge)
        deferred.resolve($firebaseArray(new Firebase(firebaseUrl + '/counselors' + '/' + counselor.person.badge)).$loaded().then(function (data) {
            return data;
        }));
        return deferred.promise;
    }

});

