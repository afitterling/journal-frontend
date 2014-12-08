'use strict';

angular.module('famousAngular')
  .controller('DataCtrl', ['$rootScope', '$timeout', '$log', '$scope', '$resource', '$http', 'Items', 'auth',
    function ($rootScope, $timeout, $log, $scope, $resource, $http, Items, auth) {

    var conf = $scope.conf;

    var self = this;

    self.items = $scope.items;

    var items = Items(conf);

    $scope.addItem = function (item) {
      $scope.success = null;
      /* jshint camelcase: false */
      item.user_id = $scope.profile.user_id;
      items.save({item: item}, function (success) {
        var Tagger = $resource($scope.conf.API_BASEURL + '/items/' + $scope.item.id + '/tag');

        var taggedItem;
        // @FIXME tags with array one post!
        angular.forEach($scope.filterTagsSelected, function(tag){
          taggedItem = Tagger.tag({tag_id: tag.id}, function(){});
        });

        self.items.push(taggedItem);
        $scope.success = true;
        $scope.item = {};
      }, function (error) {
        $scope.success = false;
        $scope.item = item;

      });
    };

    // update model
    // we use a trick here:
    // as the editable allows editable per attr of one obj/item we end up in having multiple change/update requests per obj or id
    // as of this fact we update with timeouts/promises and cancel the pre chosen promises if other fields got edited as well
    // as the parameter is always the whole model this won't matter
    var cancelUpdate = {};
    $scope.updateItem = function (item) {
      $log.debug('cancelUpdate', cancelUpdate);
      if (angular.isDefined(cancelUpdate[item.id])) {
        if (cancelUpdate[item.id].status !== 1) { // 1 => resolved
          cancelUpdate[item.id]();
        }
      }
      cancelUpdate[item.id] = $timeout(function(){
        $log.debug('update triggered', item);
        $scope.success = null;
        items.update(item, function (success) {
          $scope.success = true;
          delete cancelUpdate[item.id]; // delete the promise from list as we know it ran through
          $log.debug('cancelUpdate', cancelUpdate);
        }, function (error) {
          $scope.success = false;
          $log.debug('cancelUpdate', cancelUpdate);
        });
      }, 5000);
      $log.debug('cancelUpdate', cancelUpdate);
    };

    $scope.deleteItem = function (item) {
      items.delete({id: item.id}, function(success){
        self.items.splice(self.items.indexOf(item), 1);
        $log.debug('deleted item', item);
      });
    };

    $scope.openTagModal = function (item) {
//      console.log(item);
      $scope.modalItem = item;
      if (angular.isUndefined($scope.modalItem.tags)) {
        $scope.modalItem.tags = [];
      }
      $('#tagModal').modal();
    };

    $scope.Tags = $resource($scope.conf.API_BASEURL + '/tags/:id', {id: '@id'});

    $scope.Tags.query({user_id: auth.profile.user_id}, function (success) {
      $scope.tags = success;
    });

    $scope.filterTagsSelected = [];
    $scope.tagFilter = { active: []};

    $scope.toggleTagFilter = function (tag) {
//      console.log('abc', tag);
//      console.log($scope.filterTagsSelected);
      if ($scope.filterTagsSelected.indexOf(tag) >= 0) {
        $scope.filterTagsSelected.splice($scope.filterTagsSelected.indexOf(tag), 1);
//        console.log('selected Filters:', $scope.filterTagsSelected);
        $scope.tagFilter.active[tag.id] = undefined;
        return;
      }

      if ($scope.filterTagsSelected.indexOf(tag) === -1) {
        $scope.filterTagsSelected.push(tag);
//        console.log('selected Filters:', $scope.filterTagsSelected);
        $scope.tagFilter.active[tag.id] = true;
      }

    };

    // .............
    $scope.filterOptions = {
      'tagged': function (item) {
        var found = false;

        angular.forEach($scope.filterTagsSelected, function (filterSelectedItem) {
//          console.log(item.tags);
          angular.forEach(item.tags, function (tag) {
            if (tag.id === filterSelectedItem.id) {
//              console.log('found');
              found = true;
            }

          });
        });

        if ($scope.filterTagsSelected.length === 0) { found = true; }

        return found;
      }
    };

    $scope.filterFromTags = function (arg) {
//      console.log(arg);
      return false;
    };

  }]);
