"use strict";

angular
    .module('issueTracker.navbarDirective', [])
    .directive('navbar', [
        'currentUser',
        function navbar(currentUser) {
        return {
            restrict: 'A',
            templateUrl: 'app/common/navbar.html',
            link: function (scope) {
                scope.hasLogged = function() {
                    return !!sessionStorage['authToken'];
                }
            }
        }
    }]);