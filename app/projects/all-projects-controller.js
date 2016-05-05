"use strict";

angular
    .module('issueTracker.controllers.allProjects', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects', {
            controller: 'AllProjectsCtrl',
            templateUrl: 'app/projects/all-projects-template.html'
        });
    }])
    .controller('AllProjectsCtrl', [
        '$scope',
        'projectsService',
        'usersService',
        'ITEMS_PER_PAGE',
        '$location',
        function AllProjectsCtrl($scope, projectsService, usersService, ITEMS_PER_PAGE, $location) {
            if (!sessionStorage['authToken']) {
                $location.path('/login');
            }

            // pagination params
            $scope.projectsParams = {
                'startPage': 1,
                'pageSize': ITEMS_PER_PAGE,
                'filter': ''
            };
            
            $scope.itemsPerPage = ITEMS_PER_PAGE;

            usersService.getCurrent()
                .then(function(user) {
                    if(!user.isAdmin) {
                        $location.path('/');
                    }
                });

            $scope.getAll = function() {
                projectsService.getByFilter(ITEMS_PER_PAGE, $scope.projectsParams.startPage)
                    .then(function(projects) {
                        $scope.allProjects = projects.data.Projects;
                        $scope.totalProjects = projects.data.TotalCount
                    })
            };
            $scope.getAll();

            $scope.addProject = function() {
                $location.path('/projects/add');
            };
            
            $scope.goToProject = function (id) {
                $location.path('/projects/' + id);
            }
        }
    ]);