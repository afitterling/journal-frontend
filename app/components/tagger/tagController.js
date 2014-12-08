angular.module('famousAngular')
  .controller('TagCtrl', ['$log', '$scope', '$resource', '$http', 'auth',
    function ($log, $scope, $resource, $http, auth) {
      //
      var self = this;

      $scope.addTag = function (tag) {
        console.log(tag);
        $scope.tags.push(tag);
        tag.user_id = auth.profile.user_id;
        var status = null;
        $scope.Tags.save({tag: tag}, function (data) {
          // success
          $scope.modalItem.tags.push(data);
          status = true;
        });

        return status;
      };

      $scope.deleteTag = function (tag) {
        $scope.Tags.delete({id: tag.id}, function (data) {
          // success
          $scope.tags.splice($scope.tags.indexOf(tag), 1);
        });
      };

      $scope.removeTag = function (tag) {
        $scope.modalItem.tags.splice($scope.modalItem.tags.indexOf(tag), 1);
      };


      $scope.tagItem = function (tag) {
        var Tagger = $resource($scope.conf.API_BASEURL + '/items/' + $scope.modalItem.id + '/tag', {id: '@id'});
        if ($scope.modalItem.tags.indexOf(tag) >= 0) {
          return;
        }
        console.log(tag);
        Tagger.save({tag_id: tag.id}, function (success) {
          console.log(success);
          $scope.modalItem.tags.push(tag);
        });

      };
    }]);

