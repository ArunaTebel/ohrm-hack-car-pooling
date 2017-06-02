angular.module('starter.services', [])

    .factory('Drivers', function () {
        var drivers = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'BMW M3',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'McLaren F1',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'Ferrari F50',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Ford Mustang',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'Bugatti Veyron.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return drivers;
            },
            remove: function (chat) {
                drivers.splice(drivers.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < drivers.length; i++) {
                    if (drivers[i].id === parseInt(chatId)) {
                        return drivers[i];
                    }
                }
                return null;
            }
        };
    });
