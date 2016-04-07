'use strict';

angular.module('thegitfather.flabel', [])
  .directive('flabel', function() {
    return {
      scope: {},
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var $flabelContainer = element.parent();
        var $flabel = angular.element('<label for="'+attrs.id+'" class="flabel">'+attrs.placeholder+'</label>');

        $flabelContainer.addClass('flabeled');
        element.parent().prepend($flabel);
        scope.inputCtrl = controller;

        scope.toggleFlabel = function (show) {
          if (show) {
            if (!$flabelContainer.hasClass('flabel-visible')) {
              $flabelContainer.removeClass('flabel-hidden');
              $flabelContainer.addClass('flabel-visible');
            }
          } else {
            $flabelContainer.removeClass('flabel-visible');
            $flabelContainer.addClass('flabel-hidden');
          }
        };

        scope.$watch('inputCtrl.$modelValue', checkValueLength);
        scope.$watch('inputCtrl.$viewValue', checkValueLength);

        function checkValueLength (newValue) {
         if (newValue !== undefined && newValue.length > 0) {
           scope.toggleFlabel(true);
         } else {
           scope.toggleFlabel(false);
         }
       }

      }
    };
  });
