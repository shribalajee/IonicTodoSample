starter.controller('CensorCtrl', function ($scope, $state, $http, $cordovaSQLite, $ionicPopup, $filter) {

    $scope.doSaveCensorData = function (data) {
        var tm = new Date();
        var tTimeN = $filter('date')(tm, 'MM/dd/yy h:mm:ss a');
        var query = "INSERT INTO CensorMaster (SiteId,CensorId,CensorValue,TimeStamp) VALUES (?,?,?,?)";
        $cordovaSQLite.execute(dbMaster, query, [data.SiteId, data.CensorId, data.CensorValue, tTimeN]).then(function (res) {
            $ionicPopup.alert({ title: 'Success!', template: 'Data saved successfully.' });
        }, function (err) {
            $ionicPopup.alert({ title: 'Fail!', template: 'Data not saved.' });
        });
    };

    $scope.doSyncData = function () {
        var query = "SELECT * FROM CensorMaster";
        $cordovaSQLite.execute(dbMaster, query).then(function (result) {
            if (result.rows.length > 0) {
                var itemsColl = [];
                for (var i = 0; i < result.rows.length; i++) {
                    itemsColl[i] = result.rows.item(i);
                };
                $scope.attendanceDetails = itemsColl;
            }
            $http.post(urlPath + 'Api/Censor', { CensorDetails: $scope.attendanceDetails }).success(function (response) {
                if (response > 0) {
                    $ionicPopup.alert({ title: 'Success!', template: 'Data synced successfully.' });
                }
                else {
                    $ionicPopup.alert({ title: 'Fail!', template: 'Data not synced.' });
                }
            }).error(function (error) {
                $ionicPopup.alert({ title: 'Warning!', template: 'Data not synced due to internet problem.Please check your internet connection and try again' });
            })
        }, function (err) {
            $ionicPopup.alert({ title: 'Fail!', template: 'Data not Found.' });
        });
    };
});