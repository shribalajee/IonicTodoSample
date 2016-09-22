var dbMaster = null;
var urlPath = 'http://localhost:8139/';
//var urlPath = 'http://61.246.5.214:10015/';
var starter = angular.module('starter', ['ionic', 'ngCordova'])

starter.run(function ($ionicPlatform, $cordovaSQLite, $ionicPopup) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
        if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.diagnostic) {
            cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
                //alert("Location is " + (enabled ? "enabled" : "disabled"));
                if (enabled == false) {
                    $ionicPopup.confirm({
                        title: 'Allow "To Do Struct" to access your current location while using the app?',
                        template: 'This service is for showing your current location',
                        cancelText: 'Don' + "'" + 't Allow',
                        okText: 'Allow'
                    }).then(function (res) {
                        if (res) {
                            if (typeof cordova.plugins.settings.openSetting != undefined) {
                                cordova.plugins.settings.openSetting("location_source", function () {
                                    console.log("opened location_source settings")
                                },
                                function () {
                                    console.log("failed to open location settings")
                                });
                            }
                        }
                    });
                }
            }, function (error) {
                $ionicPopup.alert({ title: 'Fail', template: 'The following error occurred:' + error });
            });
        }
        if (!window.cordova) {
            dbMaster = $cordovaSQLite.openDB({ name: "my.dbMaster" });
        } else {
            dbMaster = window.openDatabase("my.dbMaster", '1', 'my', 1024 * 1024 * 100);
        }
        $cordovaSQLite.execute(dbMaster, "CREATE TABLE IF NOT EXISTS UserMaster (Id integer primary key,UserName text NOT NULL UNIQUE, Password text NOT NULL,FirstName text,LastName text NULL,EmailId text NOT NULL,Address text,MobileNo text NOT NULL)");
        $cordovaSQLite.execute(dbMaster, "CREATE TABLE IF NOT EXISTS CensorMaster (Id integer primary key,SiteId text, CensorId integer,CensorValue text,TimeStamp text)");
     });
})

starter.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    })

    .state('censor', {
        url: '/censor',
        templateUrl: 'templates/censor.html',
        controller: 'CensorCtrl'
    })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    // Each tab has its own nav history stack:

    .state('app.dash', {
        url: '/dash',
        views: {
            'menuContent': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('app.geoLocation', {
        url: "/geoLocation",
        views: {
            'menuContent': {
                templateUrl: "templates/geoLocation.html",
                controller: 'GeoLocationCtrl'
            }
        }
    })

    .state('app.takePhoto', {
        url: "/takePhoto",
        views: {
            'menuContent': {
                templateUrl: "templates/takePhoto.html",
                controller: "TakeImageCtrl"
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
