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

        $scope.toggleChange = function () {
            // if ($scope.value == false) {
            //   $scope.value = true;
            // } else
            //   $scope.value = false;
            console.log($scope.settings);
        };
    })

    .controller('LoginCtrl', function ($scope, $stateParams, Drivers, $state, LoginService) {
        $scope.title = "Login";
        $scope.obj = {};

        $scope.formSubmit = function () {
            if (LoginService.login($scope.obj.username, $scope.obj.password)) {
                $scope.error = '';
                $scope.username = '';
                $scope.password = '';
                $state.transitionTo('tab.profile');
            } else {
                $scope.error = "Incorrect username/password !";
            }
        };
    })

    .factory('LoginService', function ($http, $httpParamSerializer) {
        var admin = 'admin';
        var pass = 'pass';
        var isAuthenticated = false;

        return {
            login: function (username, password) {
                var issueTokenRequest = {
                    method: 'POST',
                    url: '/oauth/issueToken',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        grant_type: 'client_credentials',
                        client_id: 'aruna',
                        client_secret: 'aruna'
                    }
                };


                $http(issueTokenRequest).then(
                    function (response) {
                        if (response.data.access_token) {
                            var loginRequest = {
                                method: 'POST',
                                url: '/api/v1/login',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Authorization': 'Bearer ' + response.data.access_token
                                },
                                data: "username=" + username + "&password=" + password
                            };
                            $http(loginRequest).then(function (response) {
                                if (response.data.login) {
                                    localStorage.loggedInUser = angular.toJson(response.data);
                                }
                            });

                        } else {
                            console.log('Access Token Not Recieved!');
                        }
                    },
                    function () {

                    }
                );


                isAuthenticated = username === admin && password === pass;
                return isAuthenticated;
            },
            isAuthenticated: function () {
                return isAuthenticated;
            }
        };

    });
