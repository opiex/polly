

pollyApp.controller('questionCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  console.log("Hello World from question");

  $http.get('/questions/' +$routeParams.questionId).success(function(response) {
    $scope.question = response;
    $scope.response= "";
    console.log($scope.question.title +" receieved");
    console.log($scope.question.questionType);

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
      console.log($scope.question.responses);
    };


  });



}]);
