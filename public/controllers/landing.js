var pollyApp = angular.module('pollyApp', ['ngRoute']);
pollyApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("Hello World from controller");

//$scope.questions = [{title: "What's your favorite movie?", id:"2"}, {title: "What's your favorite pokemon?", id:"3"}];

var refresh = function() {
  $http.get('/questions').success(function(response) {
    console.log("I got the data I requested");
    $scope.questions = response;
  });
};

refresh();

}]);


pollyApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
      templateUrl: '/partials/landing.html',
      controller: 'AppCtrl'
    }).
    when('/questions/:questionId', {
      templateUrl: 'partials/question.html',
      controller: 'questionCtrl'
    }).
    when('/nav', {
      templateUrl: 'partials/nav.html',
      controller: 'navCtrl'
    }).
    when('/ask/:questionType', {
      templateUrl: 'partials/ask.html',
      controller: 'NewQuestionCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  }]);

