
starter.controller('LoginCtrl', function ($scope, $state, $ionicPopup, $cordovaSQLite) {
    $scope.loginData = {};
    $scope.doLogin = function () {
        selectUserDetails($scope.loginData.username, $scope.loginData.password);
    };
    $scope.goRegister = function () {
        $state.go('register');
    }
    function selectUserDetails(userName, password) {
        if (userName == null || userName == "") {
            $ionicPopup.alert({ title: ' Input Required', template: 'Please enter user name.' });
            return false;
        }
        else if (password == null || password == "") {
            $ionicPopup.alert({ title: ' Input Required', template: 'Please enter password.' });
            return false;
        }
        else {
            var query = "SELECT * FROM UserMaster WHERE UserName = (?) AND Password = (?)";
            $cordovaSQLite.execute(dbMaster, query, [userName.toLowerCase(), password]).then(function (res) {
                if (res.rows.length > 0) {
                    $state.go('app.dash');
                    return;
                }
                else {
                    $ionicPopup.alert({ title: 'Login Failed', template: 'Authentication failed. Please enter correct user name and password' });
                }
            }, function (err) {
                $ionicPopup.alert({ title: 'Login Failed', template: 'Authentication failed. Please enter correct user name and password' });
            });
        }
    }
})
