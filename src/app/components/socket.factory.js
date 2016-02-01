/* global io:false */
(function() {
  'use strict';

  angular
    .module('ty')
    .factory('socket', Socket);

  /** @ngInject */
  function Socket(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3030')
    })
  }
})();