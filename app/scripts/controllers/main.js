'use strict';

angular.module('famousAngular')
  .controller('AppCtrl', function ($scope, $log, $location, auth, $state) {

    var self = this;

    // @TODO get from AppStore
    self.tabs = [
//      { title: 'tabs', state: 'home'},
      { title: 'Home', state: 'home'},
      { title: 'Journal', state: 'journal'},
      { title: 'Profile', state: 'profile'}
    ];

    var tab = null;

    //$scope.tabs = tabs;
    //self.selectedIndex = 0;

    $scope.$watch('selectedIndex', function (current, old) {
//      if (old && (old !== current)) {
//        $log.debug('Goodbye ' + tabs[old].title + '!');
//
//      }
      if (current !== old) {
        tab = self.tabs[current];
//        $log.debug('current =', current);
//        $location.path(tabs[current].state).replace();
        $state.go(tab.state);
      }
    });
  })

  //
  .controller('MainCtrl', ['$log', '$scope', '$resource', '$http',
    function ($log, $scope, $resource, $http) {
      //
    }])
;

