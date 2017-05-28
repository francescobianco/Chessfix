/**
 *
 *
 */

angular
    .module("app")
    .component("home", {
        templateUrl: "app/components/home/home.html",
        controller: function($scope) {


            var board1 = ChessBoard('board1', 'start');

        }
    });