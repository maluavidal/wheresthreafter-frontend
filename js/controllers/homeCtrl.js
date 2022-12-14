myApp.controller('homeCtrl', ['$scope', "$state", "EventService", '$location', function ($scope, $state, EventService, $location) {

    const init = () => {
        listAllEvents(),
            listCities()
    };

    const listAllEvents = filter => {
        EventService.listEvents(filter).then(resp => {
            $scope.events = resp.data;

            if (!filter) {
                $scope.notFound = true;
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    const refresh = event => {
        $scope.loading = false
        $location.path(`/events/${event.id}`)
    }

    const changeDate = () => {
        const filter = {
            starts_at: moment($scope.startDate).startOf('day').format('YYYY-MM-DD'),
            ends_at: moment($scope.endDate).startOf('day').format('YYYY-MM-DD')
        }
        listAllEvents(filter);
    }

    const searchName = () => {
        const filter = {
            name: $scope.searchEvents
        }
        listAllEvents(filter);
    }

    const filterLocation = () => {
        const filter = {
            city: $scope.searchLocations
        }


        console.log(filter);

        listAllEvents(filter);
    }

    const listCities = () => {
        EventService.getCities()
            .then(resp => {
                $scope.locations = resp.data;
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const loggedIn = () => {
        const userId = localStorage.getItem('user_id')

        if (!userId) {
            $state.go('loginPage')
            return
        }

        $state.go('producerPage', {
            userId: userId
        })
    }

    init()

    $scope.refresh = refresh;
    $scope.listAllEvents = listAllEvents;
    $scope.changeDate = changeDate;
    $scope.filterLocation = filterLocation;
    $scope.listCities = listCities;
    $scope.searchName = searchName;
    $scope.loggedIn = loggedIn;

}]);