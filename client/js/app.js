'use strict';
var app = angular.module('ViZu', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCrtl'

    }).when('/uns', {
        templateUrl: 'views/uns.html',
        controller: 'uns',
        reloadOnSearch: false
        
    }).when('/about', {
        templateUrl: 'views/about.html',
        controller: 'aboutCrtl'
        
  }).when('/kontakt', {
        templateUrl: 'views/kontakt.html',
        controller: 'kontacktCrtl'



    }).otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode(false);
});

/*
 otherwise({

 redirectTo: function() {
 window.location = "views/notfound.html";
 }
 });
 */

app.factory('myService', function () {
    var savedData;

    function set(data) {
        savedData = data;
    }

    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }

});

/*controller for  user input query in the nav */
app.controller('Main', function ($scope, $location, myService) {
    $scope.check = false;
    /* check will be used to check that the input is not empty with a popup info bubble !!!!*/
    $scope.myquery = null;

    $scope.search = function () {
        if ($scope.myquery == null) {
            $scope.check = true;
        }
        else {

            console.log($scope.myquery);
            myService.set($scope.myquery);
            $location.url('/demo');
            $location.search('query', $scope.myquery);
        }

    };

    $scope.EnterKeyPressed = function ($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
            if ($scope.myquery) {
                console.log($scope.myquery);
                myService.set($scope.myquery);
                $location.url('/demo');
                $location.search('query', $scope.myquery);
            }
        }
    }

});

/*controller for active nav*/
app.controller('activeNav', function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});















  
      