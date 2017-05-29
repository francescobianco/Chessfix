
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
            $rootScope.setting = resp.data;
        });
        $rootScope.callExec = function () {
            var script = $rootScope.currentScript.exec
                .replace("${FEN}", '"'+$rootScope.currentPosition.fen+'"');
            $http.post("/exec", {
                script: script
            }).then(function(resp){
                $("#terminal").html(resp.data.terminal);
            });
        };
        $rootScope.loadCurrentPositions = function() {
            $http.post("/positions", {
                epd: $rootScope.currentEpd
            }).then(function(resp){
                $rootScope.currentPositions = resp.data;
            });
        };
    });

