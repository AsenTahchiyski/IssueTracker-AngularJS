'use strict';

angular
    .module('issueTracker.services.notifier', [])
    .config(['growlProvider',
        function (growlProvider) {
            growlProvider.globalTimeToLive(5000);
            // growlProvider.globalInlineMessages(true);
        }])
    .factory('notifier', [
        'growl',
        function (growl) {
            return {
                success: function (msg) {
                    growl.success(msg);
                },
                warning: function (msg) {
                    growl.warning(msg);
                },
                error: function (msg) {
                    growl.error(msg);
                }
            }
        }
    ]);