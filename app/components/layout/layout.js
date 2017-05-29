/**
 *
 *
 */

var mainboard = null;

angular
    .module("app")
    .component("layout", {
        templateUrl: "app/components/layout/layout.html",
        controller: function($scope) {}
    })
    .run(function($rootScope) {
        $rootScope.$watch("currentPosition", function(position) {
            console.log("cp:", position);
            if (typeof position === "undefined") {
                mainboard = new ChessBoard("mainboard");
            } else {
                mainboard.position(position.fen);
            }
        });
    });