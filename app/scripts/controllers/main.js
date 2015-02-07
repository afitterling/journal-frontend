'use strict';

angular.module('famousAngular')
  .controller('MainCtrl', ['$log', '$scope', '$resource', '$http',
    function ($log, $scope, $resource, $http) {
      //
    }])
//;

//angular.module('famousAngular', ['ngMaterial'])
  .controller('AppCtrl', function ($scope, $log, $location) {
    var tabs = [
      { title: 'Home', content: "Tabs will become paginated if there isn't enough room for them.", state: '/'},
      { title: 'Profile', content: "You can swipe left and right on a mobile device to change tabs.", state: '/profile'}
//      { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
//      { title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
//      { title: 'Five', content: "If you remove a tab, it will try to select a new one."},
//      { title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want."},
//      { title: 'Seven', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab."},
//      { title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"},
//      { title: 'Nine', content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs."},
//      { title: 'Ten', content: "If you're still reading this, you should just go check out the API docs for tabs!"}
    ];
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function (current, old) {
      if (old && (old !== current)) {
        $log.debug('Goodbye ' + tabs[old].title + '!');

      }
      if (current) {
        $log.debug('Hello ' + tabs[current].title + '!');
        $location.path(tabs[current].state);
      }
    });
//    $scope.addTab = function (title, view) {
//      view = view || title + " Content View";
//      tabs.push({ title: title, content: view, disabled: false});
//    };
//    $scope.removeTab = function (tab) {
//      for (var j = 0; j < tabs.length; j++) {
//        if (tab.title == tabs[j].title) {
//          $scope.tabs.splice(j, 1);
//          break;
//        }
//      }
//    };
  });

