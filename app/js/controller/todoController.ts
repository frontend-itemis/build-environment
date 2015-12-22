/* todoController */

app.controller('todoController', function ($scope) {
    $scope.todos = sortByName(todos);
});