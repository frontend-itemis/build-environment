/// <reference path='libs/angularjs/angular.d.ts' />

'use strict';

var app = angular.module('starter-kit', ['ngMaterial', 'ngResource']);

interface Todo {
    name: string;
    minutes?: number;
}

var todos = [
    { name: "Zimmer Aufräumen" },
    { name: "Einkaufen" },
    { name: "Tanken" },
    { name: "Fernsehen" },
    { name: "Boden wischen" }
];

function sortByName(a: Todo[]) {
    var result = a.slice(0);
    result.sort(function (x, y) {
        return x.name.localeCompare(y.name);
    });
    return result;
}