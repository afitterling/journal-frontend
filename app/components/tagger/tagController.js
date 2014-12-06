angular.module('famousAngular')
  .controller('TagCtrl', ['$log', '$scope', '$resource', '$http',
    function ($log, $scope, $resource, $http) {
      //
      var self = this;

      $scope.addTag = function (tag) {
        console.log(tag);
        $scope.tags.push(tag);
        return true;
      };

      $scope.deleteTag = function (tag) {
        $scope.tags.splice($scope.tags.indexOf(tag), 1);
      };

      $scope.tagItem = function (tag) {
        console.log(tag);
      };
    }]);

