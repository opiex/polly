

pollyApp.controller('questionCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  console.log("Hello World from question");

  $scope.canVote = true;
  $scope.answersVoted = [];
  $scope.question = "";

  var refresh = function(){
    $http.get('/questions/' +$routeParams.questionId).success(function(response) {
      $scope.question = response;
      $scope.response= "";
      //console.log($scope.question.title +" receieved");
      //console.log($scope.question.questionType);

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
    $scope.question.responses.push($scope.response);
    $http.put('/questions/ ', $scope.question).success(function(response) {
      console.log(response);
      refresh();
    });
  };

  $scope.addVote = function(index){
    if($scope.question.questionType === "single"){
      if($scope.canVote === true){
        console.log("adding vote to answer: " +index);
        $scope.canVote = false;
        addVoteInServer(index, 1);
      }
      else{
        console.log("cant vote. already voted!");
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

  addVoteInServer = function(index, numToAdd){
    $http.put('/questions/vote', {question: $scope.question, response: index, numToAdd: numToAdd}).success(function(response) {
      console.log(response);
      refresh();
    });
  };


}]);
