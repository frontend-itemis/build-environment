/// <reference path='../_all.ts' />
/* TodoItem */
var starterkit;
(function (starterkit) {
    "use strict";
    var TodoItem = (function () {
        function TodoItem(name) {
            this.name = name;
        }
        return TodoItem;
    })();
    starterkit.TodoItem = TodoItem;
})(starterkit || (starterkit = {}));
/// <reference path='../_all.ts' />
/* UserItem */
var starterkit;
(function (starterkit) {
    "use strict";
    var UserItem = (function () {
        function UserItem(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
        return UserItem;
    })();
    starterkit.UserItem = UserItem;
})(starterkit || (starterkit = {}));
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
/* TodoController */
var starterkit;
(function (starterkit) {
    "use strict";
    var TodoCtrl = (function () {
        function TodoCtrl($scope) {
            this.$scope = $scope;
            this.todos = [
                new starterkit.TodoItem("Einkaufen"),
                new starterkit.TodoItem("Putzen"),
                new starterkit.TodoItem("Zimmer aufräumen"),
                new starterkit.TodoItem("Kochen")
            ];
            this.todos = this.sortByName(this.todos);
            $scope.todos = this.todos;
        }
        TodoCtrl.prototype.sortByName = function (a) {
            var result = a.slice(0);
            result.sort(function (x, y) {
                return x.name.localeCompare(y.name);
            });
            return result;
        };
        return TodoCtrl;
    })();
    starterkit.TodoCtrl = TodoCtrl;
})(starterkit || (starterkit = {}));
/// <reference path='../_all.ts' />
/* FormController */
var starterkit;
(function (starterkit) {
    "use strict";
    var FormCtrl = (function () {
        function FormCtrl($scope) {
            this.$scope = $scope;
            $scope.user = {
                firstName: "",
                lastName: ""
            };
        }
        return FormCtrl;
    })();
    starterkit.FormCtrl = FormCtrl;
})(starterkit || (starterkit = {}));
/// <reference path='_all.ts' />
var starterkit;
(function (starterkit) {
    "use strict";
    var app = angular.module("starterkit", ["ngMaterial", "ngResource"])
        .controller("todoController", starterkit.TodoCtrl)
        .controller("formController", starterkit.FormCtrl);
})(starterkit || (starterkit = {}));
/// <reference path='libs/jquery/jquery.d.ts' />
/// <reference path='libs/angularjs/angular.d.ts' />
/// <reference path='models/TodoItem.ts' />
/// <reference path='models/UserItem.ts' />
/// <reference path='interfaces/ITodoScope.ts' />
/// <reference path='interfaces/IFormScope.ts' />
/// <reference path='controllers/TodoCtrl.ts' />
/// <reference path='controllers/FormCtrl.ts' />
/// <reference path='app.ts' /> 
