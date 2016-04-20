"use strict";

angular
    .module('issueTracker.filters.date', [])
    .filter('dateFormat', [
        '$filter',
        function ($filter) {
            return function (input, format) {
                return $filter('date')(new Date(input), format);
            };
        }
    ]);