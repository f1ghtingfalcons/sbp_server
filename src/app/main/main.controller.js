(function() {
  'use strict';

  angular
    .module('ty')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;
    vm.classAnimation = '';
    vm.creationDate = 1453359319969;
    
    vm.gps = {
        position: {
            x: 1032.234234,
            y: 234.234234,
            z: -2342.23422
        }
    }
  }
})();
