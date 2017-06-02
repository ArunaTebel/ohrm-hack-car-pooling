angular.module('starter.controllers', [])

    .controller('MapCtrl', function ($scope) {
    })

    .controller('DriversCtrl', function ($scope, Drivers) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Drivers.all();
        $scope.remove = function (chat) {
            Drivers.remove(chat);
        };
    })

    .controller('DriverDetailCtrl', function ($scope, $stateParams, Drivers) {
        $scope.chat = Drivers.get($stateParams.chatId);
    })

    .controller('ProfileCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
