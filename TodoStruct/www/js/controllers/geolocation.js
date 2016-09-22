starter.controller('GeoLocationCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $cordovaGeolocation) {
    $scope.lat = "0";
    $scope.lng = "0";
    $scope.accuracy = "0";
    $scope.addressNew = "Address Not Found";
    var posOptions = { timeout: 10000, enableHighAccuracy: false };
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var geocoder = new google.maps.Geocoder();
        $scope.lat = position.coords.latitude
        $scope.lng = position.coords.longitude
        $scope.accuracy = position.coords.accuracy

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        geocoder.geocode({ 'latLng': latLng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var address = results[1].formatted_address.toString();
                    var mySplitResult = address.split(",");
                    var len = mySplitResult.length;
                    var subs = mySplitResult[len - 2];
                }
                $scope.addressNew = address;
            }
            else {
                $scope.addressNew = "Address Not Found";
            }
        });
    }, function (err) {
        console.log(err)
    });

})
