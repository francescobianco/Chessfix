angular
    .module("app", ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("home", {
                url: "/",
                template: "<home/>"
            });
    })
    .run(function($rootScope, $http){
        $http.post("/setting").then(function(resp){
            console.log(resp.data.epd);
            $rootScope.setting = resp.data;
            $rootScope.test = "TEST";
        });
    });

