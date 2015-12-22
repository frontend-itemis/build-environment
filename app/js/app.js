/// <reference path='libs/angularjs/angular.d.ts' />
'use strict';
var app = angular.module('starter-kit', ['ngMaterial', 'ngResource']);
var todos = [
    { name: "Zimmer Aufräumen" },
    { name: "Einkaufen" },
    { name: "Tanken" },
    { name: "Fernsehen" },
    { name: "Boden wischen" }
];
function sortByName(a) {
    var result = a.slice(0);
    result.sort(function (x, y) {
        return x.name.localeCompare(y.name);
    });
    return result;
}
/* todoController */
app.controller('todoController', function ($scope) {
    $scope.todos = sortByName(todos);
});
