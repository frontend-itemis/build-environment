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
