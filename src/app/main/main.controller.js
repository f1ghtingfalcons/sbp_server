(function() {
  'use strict';

  angular
    .module('ty')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, socket, $timeout) {
    var vm = this;
    
    vm.options = {
        chart: {
            type: 'scatterChart',
            height: 720,
            width: 720,
            scatter: {
                onlyCircles: false
            },
            xAxis: {
                axisLabel: 'North (mm)'
            },
            yAxis: {
                axisLabel: 'East (mm)'
            }
        }
    };
    
    vm.config = {
        visible: true, // default: true
        extended: false, // default: false
        disabled: false, // default: false
        refreshDataOnly: true, // default: true
        deepWatchOptions: false, // default: true
        deepWatchData: true, // default: true
        deepWatchDataDepth: 2, // default: 2
        debounce: 0 // default: 10
    }
    
    vm.data = [];
    
    vm.data.push({
        color: "#ff0000",
        key: 'Rover Position',
        values: []
    });
    
    vm.gps = {
        connection: true,
        lock: true,
        n_sats: -1,
        n_points: 0,
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
    
    vm.solution = {
        x: 0,
        y: 0,
        z: 0
    };
    
    //limit the number of plotted points
    //this will eliminate lag in the browser
    var counter = 0;
    var MAX_DATA = 100;
    //if no data report no connection
    var MAX_IDLE = 500; //time in milliseconds (approximate)
    
    var timeout = $timeout( function(){ vm.gps.connection = false } , MAX_IDLE);
    
    socket.on('MSG_BASELINE_NED', function(data) {
        vm.gps.position.x = data.e;
        vm.gps.position.y = data.n;
        vm.gps.position.z = data.d;
        vm.gps.connection = true;
        vm.gps.n_sats = data.n_sats;
        vm.solution.x = vm.gps.position.x + vm.gimbal.offset.x + vm.drone.offset.x;
        vm.solution.y = vm.gps.position.y + vm.gimbal.offset.y + vm.drone.offset.y;
        vm.solution.z = vm.gps.position.z + vm.gimbal.offset.z + vm.drone.offset.z;
        vm.data[0].values[counter] = {
            x: data.e,
            y: data.n,
            size: 0.75,
            shape: 'cross'
        };
        vm.gps.n_points++;
        counter++;
        if ( counter === MAX_DATA ) {
            counter = 0;
        }
        $timeout.cancel(timeout);
        /// Reset the timeout
        timeout= $timeout( function(){ vm.gps.connection = false } , MAX_IDLE);
    });
  }
})();
