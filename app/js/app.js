/// <reference path='declarations/angularjs/angular.d.ts' />
'use strict';
var app = angular.module('starter-kit', []);
var todos = [
    { name: "Zimmer Aufräumen huhu" },
    { name: "Einkaufen" },
    { name: "Tanken" }
];
function sortByName(a) {
    var result = a.slice(0);
    result.sort(function (x, y) {
        return x.name.localeCompare(y.name);
    });
    return result;
}
app.controller('todoController', function ($scope) {
    $scope.todos = sortByName(todos);
});
