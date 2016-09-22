starter.controller('RegisterCtrl', function ($scope, $state, $cordovaSQLite, $ionicPopup) {
    function ClearAll(data) {
        data.UserName = null;
        data.Password = null;
        data.FirstName = null;
        data.LastName = null;
        data.EmailId = null;
        data.Address = null;
        data.MobileNo = null;
    }

    $scope.doClear = function (data) {
        ClearAll(data);
    };

    $scope.goBack = function () {
        $state.go('login');
    };

    $scope.doRegistration = function (data) {
        if (angular.isUndefined(data) || data.UserName == null || data.UserName == "") {
            $ionicPopup.alert({ title: ' Input Required', template: 'Please enter user name.' });
            return false;
        }
        else if (data.Password == null || data.Password == "") {
            $ionicPopup.alert({ title: ' Input Required', template: 'Please enter password.' });
            return false;
        }
        else if (data.FirstName == null || data.FirstName == "") {
            $ionicPopup.alert({ title: ' Input Required', template: 'Please enter first name.' });
            return false;
        }
        else if (data.EmailId == null || data.EmailId == "") {
            $ionicPopup.alert({ title: ' Input Required', template: 'Please enter email id.' });
            return false;
        }
        else if (data.Address == null || data.Address == "") {
            $ionicPopup.alert({ title: ' Input Required', template: 'Please enter address.' });
            return false;
        }
        else if (data.MobileNo == null || data.MobileNo == "") {
            $ionicPopup.alert({ title: ' Input Required', template: 'Please enter mobile number.' });
            return false;
        }
        else {
            var query = "INSERT INTO UserMaster (UserName, Password,FirstName,LastName,EmailId,Address,MobileNo) VALUES (?,?,?,?,?,?,?)";
            $cordovaSQLite.execute(dbMaster, query, [data.UserName.toLowerCase(), data.Password, data.FirstName, data.LastName, data.EmailId, data.Address, data.MobileNo]).then(function (res) {
                ClearAll(data);
                $ionicPopup.alert({ title: 'Success!', template: 'Data saved successfully.' });
                $state.go('login');
            }, function (err) {
                var query = "UPDATE UserMaster SET FirstName='" + data.FirstName + "',Password='" + data.Password + "' WHERE UserName='"+data.UserName.toLowerCase()+"'";
                $cordovaSQLite.execute(dbMaster, query).then(function (res) {
                    ClearAll(data);
                    $ionicPopup.alert({ title: 'Success!', template: 'Data Update successfully.' });
                    $state.go('login');
                });
            });
        }
    };
});