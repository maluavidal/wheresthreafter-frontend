myApp.service("SessionService", function ($http) {
    this.createSession = data => {
        return $http.post(`${baseUrl}session/`, data)
    }
})