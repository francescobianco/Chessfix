/**
 *
 *
 */

angular
    .module("app")
    .component("layout", {
        templateUrl: "app/components/layout/layout.html",
        controller: function($scope) {
            var mainboard = ChessBoard('mainboard', 'start');
        }
    });