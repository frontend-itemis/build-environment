/// <reference path='../_all.ts' />

/* FormController */

module starterkit {

    "use strict";

    export class FormCtrl {

        constructor(private $scope: IFormScope) {

            $scope.user = {
                firstName: "",
                lastName: ""
            };
        }
    }

    angular.module("starterkit").controller("formController", FormCtrl);
}
