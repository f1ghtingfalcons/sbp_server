(function() {
  'use strict';

  angular
    .module('ty')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout) {
    var vm = this;

    vm.classAnimation = '';
    vm.creationDate = 1453359319969;
  }
})();
