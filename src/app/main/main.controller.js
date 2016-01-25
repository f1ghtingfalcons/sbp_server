(function() {
  'use strict';

  angular
    .module('ty')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;
    
    vm.gps = {
        connection: true,
        position: {
            x: 1032.234234,
            y: 234.234234,
            z: -2342.23422
        }
    };
    
    vm.drone = {
        offset: {
            x: 0,
            y: 0,
            z: 0
        }
    };
    
    vm.gimbal = {
        connection: false,
        offset: {
            x: 0,
            y: 0,
            z: 0
        },
        theta_azimuth: 0,
        theta_zenith: 0
    };
  }
})();
