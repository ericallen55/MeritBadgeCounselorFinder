var app = angular.module('meritBadgeConselor', ['uiGmapgoogle-maps', 'firebase', 'ngRoute']);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCH7tUAFuth7I1du3dNEQlCSMIxMmFRP3E',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});