
pollyApp.controller('NewQuestionCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  $scope.question = {};
  $scope.question.questionType = $routeParams.questionType;
  $scope.question.answersCount = 0;
  $scope.question.responses = [];
  $scope.question.answers = [{value: '', votes: 0}, {value: '', votes: 0}];
  $scope.numberOfAnswers = $scope.question.answers.length;

  $scope.isNotFree = function(){
    return ($routeParams.questionType !== 'free');
  };

  $scope.addAnswer = function() {
    $scope.question.answers.push({value: '', votes: 0});
    console.log($scope.question.answers);
  };

  $scope.addQuestion = function() {
    console.log("submitting question:");
    console.log($scope.question);
    $http.post('/questions', $scope.question)
    .success(function(response) {
      console.log(response);
    })
    .error(function(response){
      console.log("error adding question");
    });
  };

}]);
