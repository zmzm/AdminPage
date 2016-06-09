(function () {
    'use strict';

    var app = angular
        .module('app', [
            'ngMaterial',
            'Components',
            'ui.router'
        ]);
    angular.module('Components', []);
})();