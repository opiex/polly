

pollyApp.controller('questionCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  $scope.canVote = true;
  $scope.answersVoted = [];
  $scope.question = "";
  var sumAnswers = function(){
    console.log($scope.question);
    var sum = 0;
    for(var i = 0; i < $scope.question.answers.length; i++){
      sum+= $scope.question.answers[i].votes;
    }
    console.log(sum + " total votes");
    return sum;
  };

  var refresh = function(){
    $http.get('/questions/' +$routeParams.questionId)
    .success(function(response) {
      $scope.question = response;
      $scope.response= "";
    })
    .error(function(response){
      console.log("error loading question");
    });
  };

  refresh();

  $scope.isFreeQuestion = function(){
    return $scope.question.questionType === "free";
  };

  $scope.isOneChoiceQuestion = function(){
    return $scope.question.questionType === "single";
  };

  $scope.isMultiChoiceQuestion = function(){
    return $scope.question.questionType === "multiple";
  };

  $scope.addResponse = function(){
    if(/\S/.test($scope.response) && ($scope.response !== undefined)){
      $scope.question.responses.push($scope.response);
      $http.put('/questions/ ', $scope.question)
      .success(function(response) {
        console.log(response);
        refresh();
      })
      .error(function(response){
        alert("error adding response");
        refresh();
      });
    }
    else{
      alert("cannot submit empty answer...");
    }
  };

  $scope.addVote = function(index){
    if($scope.question.questionType === "single"){
      if($scope.canVote === true){
        console.log("adding vote to answer: " +index);
        $scope.canVote = false;
        addVoteInServer(index, 1);
      }
      else{
        alert("cant vote. already voted!");
      }
    }
    else if($scope.question.questionType === "multiple"){
      console.log($scope.answersVoted);
      if($scope.answersVoted.indexOf(index) > -1){
        console.log("already voted..." +index +" to voted.. removing");
        var removeLocation = $scope.answersVoted.indexOf(index);
        $scope.answersVoted.splice(removeLocation, 1);
        addVoteInServer(index, -1);
      }
      else{
        console.log("adding" +index +" to voted");
        $scope.answersVoted.push(index);
        addVoteInServer(index, 1);
      }
    }
  };

  $scope.getWidth = function(votes){
    var percentage = (votes*100 / sumAnswers()) + '%';
    console.log('returning ' +percentage);
    return percentage;
  };

  var addVoteInServer = function(index, numToAdd){
    $http.put('/questions/vote', {question: $scope.question, response: index, numToAdd: numToAdd})
    .success(function(response) {
      console.log(response);
      refresh();
    })
    .error(function(response){
      console.log("error voting");
    });
  };


}]);
