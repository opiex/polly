var pollyApp = angular.module('pollyApp', ['ngRoute', 'monospaced.elastic', 'ngAnimate']);
pollyApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.navigationClicked = false;
  $scope.loaded = false;
  $scope.questions = "";

  var refresh = function() {
    console.log('asking for frontpage questions');
    $http.get('/questions').success(function(response) {
      console.log("I got the data I requested");
      $scope.questions = response;
      sumAnswers();
    });
  };

  var sumAnswers = function(){
    for(var i = 0; i < $scope.questions.length; i++){
      var question = $scope.questions[i];
      if(question.questionType == 'free'){
        question.sumOfAnswers = question.responses.length;
      }
      else{
        question.sumOfAnswers = countVotes(question);
      }
    }
  };

  var countVotes = function(question){
    var sum = 0;
    for(var j = 0; j < question.answers.length; j++){
      sum = sum + question.answers[j].votes;
    }
    return sum;
  };

  refresh();
  sumAnswers();

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


