"use strict";

angular
    .module('issueTracker.filters.array', [])
    .filter('arrayFilter', [
        function () {
            return function (array, separator) {
                return array.map(function(e) {
                    return e.Name;
                }).join(separator);
            };
        }
    ]);