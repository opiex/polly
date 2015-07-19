var pollyApp = angular.module('pollyApp', ['ngRoute']);
pollyApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

$scope.navigationClicked = false;

var refresh = function() {
  console.log('asking for frontpage questions');
  $http.get('/questions').success(function(response) {
    console.log("I got the data I requested");
    $scope.questions = response;
  });
};

refresh();

$scope.toggleNavigation = function(){
  console.log("called navigation, current state: " );
  $scope.navigationClicked = !$scope.navigationClicked;
};

}]);

pollyApp.directive('pollyNavigation', function() {
  return {
    restrict: 'E',
    templateUrl: '../partials/nav.html'
  };
});


