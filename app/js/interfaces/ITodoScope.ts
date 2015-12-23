/// <reference path='../_all.ts' />

/* ITodoScope */

module starterkit {
    export interface ITodoScope extends ng.IScope {
        todos: TodoItem[];
    }
}
