"use strict";

angular
    .module('issueTracker.controllers.dashboard', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])
    .controller('DashboardCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'usersService',
        'issuesService',
        'labelsService',
        'ISSUES_PER_PAGE',
        function ($scope, $location, projectsService, usersService, issuesService, labelsService, ISSUES_PER_PAGE) {
            if (!sessionStorage['authToken']) {
                $location.path('/login');
            }

            $scope.getIssues = function getIssues(pageNumber) {
                issuesService.getAssignedToCurrentUser('DueDate', 1, 1)
                    .then(function (success) {
                        $scope.assignedIssues = success;
                        return success;
                    });
            };
            $scope.getIssues();

            // and a panel with all the projects that you are associated with (you have an assigned issue in them or you are a project leader)
            $scope.getProjects = function (pageNumber) {
                $scope.projectsWithIssuesAssigned = [];
                usersService.getCurrent()
                    .then(function (currentUserData) {
                        // get current user
                        projectsService.getByFilter('Lead.Username', currentUserData.Username, ISSUES_PER_PAGE, pageNumber)
                            .then(function (projects) {
                                // get projects led
                                $scope.projectsLead = projects.data.Projects;
                                issuesService.getAssignedToCurrentUser('DueDate', 1, 1)
                                    .then(function (issuesAssigned) {
                                        // get all issues assigned
                                        if (issuesAssigned.length > 0) {
                                            issuesAssigned.forEach(function (i) {
                                                // get the projects for them
                                                projectsService.getById(i.Project.Id)
                                                    .then(function (success) {
                                                        console.log(success);
                                                        $scope.projectsWithIssuesAssigned.push(success);
                                                    }, function (error) {
                                                        console.error(error);
                                                    })
                                            })
                                        }
                                    }, function (error) {
                                        console.error(error);
                                    });
                            }, function (error) {
                                console.error(error);
                            });
                    });
            };
            $scope.getProjects(1);
        }]);