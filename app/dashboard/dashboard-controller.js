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

            $scope.projectsParams1 = {
                'startPage': 1,
                'pageSize': ISSUES_PER_PAGE,
                'filter': ''
            };

            $scope.projectsParams2 = {
                'startPage': 1,
                'pageSize': ISSUES_PER_PAGE,
                'filter': ''
            };

            $scope.projectsParams3 = {
                'startPage': 1,
                'pageSize': ISSUES_PER_PAGE,
                'filter': ''
            };

            $scope.itemsPerPage = ISSUES_PER_PAGE;
            $scope.getIssues = function getIssues(issuesPageNumber) {
                issuesService.getAssignedToCurrentUser('DueDate', $scope.projectsParams1.pageSize, $scope.projectsParams1.startPage)
                    .then(function (success) {
                        $scope.assignedIssues = success.Issues;
                        $scope.assignedIssuesTotalNumber = success.count;
                    });
            };
            $scope.getIssues(1);

            // and a panel with all the projects that you are associated with (you have an assigned issue in them or you are a project leader)
            $scope.getLedProjects = function (pageNumberProjectsLead) {
                $scope.getLedProjectsCurrentPage = pageNumberProjectsLead;
                $scope.projectsWithIssuesAssigned = [];
                usersService.getCurrent()
                    .then(function (currentUserData) {
                        // get current user
                        projectsService.getByFilter('Lead.Username', currentUserData.Username, $scope.projectsParams2.pageSize, $scope.projectsParams2.startPage)
                            .then(function (projects) {
                                $scope.totalLedProjects = projects.data.TotalCount;
                                // get projects led
                                $scope.projectsLead = projects.data.Projects;
                            }, function (error) {
                                console.error(error);
                            });
                    });
            };
            $scope.getLedProjects(1);

            $scope.goToProject = function (id) {
                $location.path('projects/' + id)
            };
            
            $scope.totalProjectsIssue = 0;
            $scope.getProjectsWithAssignedIssues = function () {
                issuesService.getAssignedToCurrentUser('DueDate', $scope.projectsParams3.pageSize, $scope.projectsParams3.startPage)
                    .then(function (issuesAssigned) {
                        // get all issues assigned
                        $scope.projectIDsWithIssuesAssigned = [];
                        if (issuesAssigned.Issues.length > 0) {
                            issuesAssigned.Issues.forEach(function (i) {
                                // get the projects id-s for them
                                $scope.projectIDsWithIssuesAssigned[i.Project.Id] = i.Project.Id;
                            });
                        }
            
                        $scope.totalProjectsIssues = $scope.projectIDsWithIssuesAssigned.count || 0;
                        console.log( $scope.projectIDsWithIssuesAssigned);
                        if ($scope.projectIDsWithIssuesAssigned) {
                            // get the unique projects
                            $scope.projectsWithIssuesAssigned = [];
                            $scope.projectIDsWithIssuesAssigned.forEach(function (id) {
                                projectsService.getById(id)
                                    .then(function (success) {
                                        $scope.projectsWithIssuesAssigned.push(success);
                                    }, function (error) {
                                        console.error(error);
                                    })
                            })
                        }
                    }, function (error) {
                        console.error(error);
                    });
            };
            $scope.getProjectsWithAssignedIssues(1);
        }]);