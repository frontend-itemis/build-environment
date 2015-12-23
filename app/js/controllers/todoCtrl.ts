/// <reference path='../_all.ts' />

/* TodoController */

module starterkit {

    "use strict";

    export class TodoCtrl {

        private todos: TodoItem[] = [
            new TodoItem("Einkaufen"),
            new TodoItem("Putzen"),
            new TodoItem("Zimmer aufräumen"),
            new TodoItem("Kochen")
        ];

        public sortByName(a: TodoItem[]) {
            var result = a.slice(0);
            result.sort(function (x, y) {
                return x.name.localeCompare(y.name);
            });
            return result;
        }

        constructor(private $scope: ITodoScope) {

            this.todos = this.sortByName(this.todos);

            $scope.todos = this.todos;
        }
    }
}
