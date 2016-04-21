"use strict";

angular
    .module('issueTracker.filters.array', [])
    .filter('arrayFilter', [
        function () {
            return function (array, separator) {
                if(array) {
                    return array.map(function(e) {
                        return e.Name;
                    }).join(separator);
                }
            };
        }
    ]);