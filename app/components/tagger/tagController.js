angular.module('famousAngular')
  .controller('TagCtrl', ['$log', '$scope', '$resource', '$http', 'auth',
    function ($log, $scope, $resource, $http, auth) {

      $scope.addTag = function (tag) {
        tag.user_id = auth.profile.user_id;
        var status = null;
        $scope.Tags.save({tag: tag}, function (data) {
          // success
          $scope.tags.push(data);
          $scope.tag = {};
          status = true;
        });
        return status;
      };

      $scope.deleteTag = function (tag) {
        $scope.Tags.delete({id: tag.id}, function () {
          // success
          $scope.tags.splice($scope.tags.indexOf(tag), 1);
          if ($scope.filterTagsSelected.indexOf(tag) !== -1) {
            $scope.filterTagsSelected.splice($scope.filterTagsSelected.indexOf(tag), 1);
            $scope.tagFilter.active[tag.id] = undefined;
            // clean up all items
          }
          $scope.cleanUpItemsFromTag(tag);
          // remove also from modal item
          if ($scope.modalItem.tags.indexOf(tag) !== -1) {
            $scope.modalItem.tags.splice($scope.modalItem.tags.indexOf(tag), 1);
          }
        });
      };

      $scope.removeTag = function (tag) {
        var Tagger = $resource($scope.conf.API_BASEURL + '/items/' + $scope.modalItem.id + '/untag');
        Tagger.delete({tag_id: tag.id}, function () {
          $scope.modalItem.tags.splice($scope.modalItem.tags.indexOf(tag), 1);
        });
      };

      $scope.tagItem = function (tag) {
        var Tagger = $resource($scope.conf.API_BASEURL + '/items/' + $scope.modalItem.id + '/tag');
        if ($scope.modalItem.tags.indexOf(tag) >= 0) {
          return;
        }
        Tagger.save({tag_id: tag.id}, function () {
          // success
          $scope.modalItem.tags.push(tag);
        });

      };
    }]);

