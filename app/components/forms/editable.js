'use strict';

angular.module('famousAngular.formHelpers.editables', [])

  .directive('editableList', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      templateUrl: 'components/forms/editable_list.html',
      replace : true,
      scope: {
        items: '=model',
        columns: '=',
        actions: '=',
        updateFunc: '&',
        // -------------------
        deleteFunc: '&',
        modalFunc: '&'
      },
      link: function (scope, elm, attrs) {
        angular.forEach(scope.actions, function (action) {
//          console.log(action);
//          if (angular.isDefined(action['data-target'])) {
////            elm.attr('data-target', action['data-target']);
////            console.log(elm);
//          }
        });
        // run callbacks given by params
        // but they need to be designed as & in scope beforehand
        scope.runCallback = function (callback, item) {
          var fn = scope[callback];
          var fnParams = [{item: item}];
          if (angular.isDefined(callback)){
            fn.apply(null, fnParams);
          }
        };
      }
    };
  }])

  .directive('editable', ['$parse', function ($parse) {
    return {
      restrict: 'E',
      templateUrl: 'components/forms/editable.html',
      replace : true,
      scope: {
        model: '=',
        column: '=',
        updateFunc: '&'
      },
      link: function (scope, elm, attrs) {
        scope.toggleState = function(){
          if (scope.editState) return;
          console.log('triggered');
          scope.editState = true;
        };
        scope.endEditMode = function(){
          scope.editState = false;
          console.log(scope.model);
          scope.$parent.updateFunc({item: scope.model});
        };
      }
    };
  }])


  .directive('new', [function() {
    return {
      link: function(scope, elm, attrs) {
        // editable should be set with model
      }
    };

  }])
;
