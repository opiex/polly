
pollyApp.controller('NewQuestionCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

  $scope.question = {};
  $scope.question.questionType = $routeParams.questionType;
  $scope.question.answersCount = 0;
  $scope.question.responses = [];
  $scope.question.answers = [{value: '', votes: 0}, {value: '', votes: 0}];
  $scope.numberOfAnswers = $scope.question.answers.length;

  $scope.isNotFree = function(){
    return ($routeParams.questionType !== 'free');
  };

  $scope.addAnswer = function(index) {
    //console.log("answer is: " +index);
    if((index === $scope.question.answers.length - 1) && (index < 6)){
      $scope.question.answers.push({value: '', votes: 0});
    }
  };

  var validate = function(){
    var isValid = true;
    isValid = isValid && /\S/.test($scope.question.title) && ($scope.question.title !== undefined);
    if($scope.question.questionType !== 'free'){
      var countOfValidAnswers = 0;
      for(var i = 0; i < $scope.question.answers.length; i++){
        //console.log($scope.question.answers[i].value);
        var currentAnswer = $scope.question.answers[i];
        if(/\S/.test(currentAnswer.value) && currentAnswer.value !== undefined){
          countOfValidAnswers++;
        }
      }
      isValid = isValid && (countOfValidAnswers > 0);
    }
    return isValid;
  };


  var modify = function(question){
    var modifiedQuestion = question;
    for(var i = 0; i < modifiedQuestion.answers.length; i++){
        var currentAnswer = modifiedQuestion.answers[i];
        if(!(/\S/.test(currentAnswer.value) && currentAnswer.value !== undefined)){
          console.log("answer " +i +" failed the test...");
          modifiedQuestion.answers.splice(i, 1);
          i--;
        }
        else{
          console.log("answer " +i +" passed the test... value: " +currentAnswer.value);
        }
      }
    return modifiedQuestion;
  };

  $scope.addQuestion = function() {
    if(validate()){
      console.log("submitting question:");
      console.log($scope.question);
      var modifiedQuestion = modify($scope.question);
      $http.post('/questions', modifiedQuestion)
      .success(function(response) {
        console.log(response);
        $location.path('/#');
      })
      .error(function(response){
        alert("error adding question");
      });
    }
    else{
      alert("invalid details...");
    }
  };
}]);
