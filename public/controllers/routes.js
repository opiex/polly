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
