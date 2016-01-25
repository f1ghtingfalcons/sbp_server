(function() {
  'use strict';

  angular
    .module('ty')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
