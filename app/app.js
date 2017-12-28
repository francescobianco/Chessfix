
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
    .run(function($rootScope, $http) {

        $http.post("/init").then(function(resp) {
            $rootScope.config = resp.data.config;
        });

        $rootScope.loadDatabase = function() {
            $http.post("/database", {
                name: $rootScope.database
            }).then(function(resp) {
                $rootScope.databaseRecords = resp.data.records;
            });
        };

        $rootScope.loadRecord = function() {
            $rootScope.mainboard.position($rootScope.databaseRecord.fen);
            $rootScope.process();
        };

        $rootScope.process = function() {
            $http.post("/process", {
                utility: $rootScope.utility,
                record: $rootScope.databaseRecord
            }).then(function (resp) {
                $("#output").html(resp.data.output);
            });
        };
    });

