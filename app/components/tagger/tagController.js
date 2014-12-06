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

      $scope.removeTag = function (tag) {
        $scope.modalItem.tags.splice($scope.modalItem.tags.indexOf(tag), 1);
      };

      $scope.tagItem = function (tag) {
        if ($scope.modalItem.tags.indexOf(tag) >= 0){ return; }
        console.log(tag);
        $scope.modalItem.tags.push(tag);
      };
    }]);

