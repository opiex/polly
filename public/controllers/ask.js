
pollyApp.controller('NewQuestionCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  console.log("Hello World from create question controller");

  $scope.question = {};
  $scope.question.questionType = $routeParams.questionType;
  $scope.question.answersCount = 0;
  $scope.question.responses = [];
  $scope.question.answers = [{value: 'answer 1', votes: 0}, {value: 'answer 2', votes: 0}];
  $scope.numberOfAnswers = 2;

  $scope.isNotFree = function(){
    return ($routeParams.questionType !== 'free');
  };

  $scope.addAnswer = function() {

    $scope.question.answers.push({value: 'answer' +(++$scope.numberOfAnswers), votes: 0});
    console.log($scope.question.answers);
  };


  $scope.addQuestion = function() {
    console.log("submitting question:");
    console.log($scope.question);
    $http.post('/questions', $scope.question).success(function(response) {
      console.log(response);
    });
  };

}]);
