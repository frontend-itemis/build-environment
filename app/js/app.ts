/// <reference path='_all.ts' />

module starterkit {

    "use strict";

    var app = angular.module("starterkit", ["ngMaterial", "ngResource"])
        .controller("todoController", TodoCtrl)
        .controller("formController", FormCtrl);
}
