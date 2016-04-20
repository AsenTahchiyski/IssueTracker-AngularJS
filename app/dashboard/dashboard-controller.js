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

            $scope.getIssues = function getIssues() {
                $scope.totalIssuesCurrentPage = 1;
                issuesService.getAssignedToCurrentUser('DueDate', ISSUES_PER_PAGE, $scope.totalIssuesCurrentPage)
                    .then(function (success) {
                        $scope.assignedIssues = success;
                        $scope.totalAssignedIssues = success.length;
                        return success;
                    });
            };
            $scope.getIssues(totalIssuesCurrentPage);

            // and a panel with all the projects that you are associated with (you have an assigned issue in them or you are a project leader)
            $scope.totalProjectsIssue = 0;
            $scope.getLedProjects = function (pageNumberProjectsLead) {
                $scope.projectsWithIssuesAssigned = [];
                usersService.getCurrent()
                    .then(function (currentUserData) {
                        // get current user
                        projectsService.getByFilter('Lead.Username', currentUserData.Username, ISSUES_PER_PAGE, pageNumberProjectsLead)
                            .then(function (projects) {
                                // get projects led
                                $scope.projectsLead = projects.data.Projects;
                                $scope.totalLeadProjects = projects.data.Projects.length;
                                issuesService.getAssignedToCurrentUser('DueDate', 1, 1)
                                    .then(function (issuesAssigned) {
                                        // get all issues assigned
                                        if (issuesAssigned.length > 0) {
                                            issuesAssigned.forEach(function (i) {
                                                // get the projects for them
                                                projectsService.getById(i.Project.Id)
                                                    .then(function (success) {
                                                        $scope.totalProjectsIssue++;
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
            $scope.getLedProjects(1);
        }]);