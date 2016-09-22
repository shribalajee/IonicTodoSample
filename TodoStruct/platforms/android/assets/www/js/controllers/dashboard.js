starter.controller('DashCtrl', function ($scope) { })

starter.controller('AppCtrl', function ($rootScope, $state, $ionicHistory, $ionicPopup) {
    $rootScope.logout = function () {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        $ionicPopup.alert({ title: 'Logout', template: 'Logged out successfully' });
        $state.go('login');
    }
})