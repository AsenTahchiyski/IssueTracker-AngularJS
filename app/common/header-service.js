'use strict';

angular
    .module('issueTracker.services.headerBuilder', [])
    .factory('headerService', [
        function headerBuilder() {
            function getAuthHeader() {
                return {
                    headers: {'Authorization': 'Bearer ' + sessionStorage['authToken']}
                };
            }

            function getWWWContentHeader() {
                return {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };
            }

            function getJSONContentHeader() {
                return {
                    headers: {'Content-Type': 'application/json'}
                };
            }

            function getAuthAndWWWContentHeader() {
                return {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage['authToken'],
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            }

            function getAuthAndJSONContentHeader() {
                return {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage['authToken'],
                        'Content-Type': 'application/json'
                    }
                }
            }

            return {
                getAuthHeader: getAuthHeader,
                getWWWContentHeader: getWWWContentHeader,
                getJSONContentHeader: getJSONContentHeader,
                getAuthAndWWWContentHeader: getAuthAndWWWContentHeader,
                getAuthAndJSONContentHeader: getAuthAndJSONContentHeader
            }
        }
    ]);