(function() {
  'use strict';

  angular
    .module('ty')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        .accentPalette('grey')
        .warnPalette('red')
        .backgroundPalette('blue')
  }

})();
