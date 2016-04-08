'use strict';

angular.module('thegitfather.flabel', [])
  .directive('flabel', function() {
    return {
      scope: {},
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var flabelText = "";
        var $flabelContainer = element.parent();
        var $flabel = angular.element('<label class="flabel"></label>');

        flabelText = getLabelText();

        if (!flabelText) {
          console.info("no label text found for:", element);
          return; // aborting here
        }

        // set 'for' attribute if element has id
        if (attrs.id !== undefined && attrs.id.length) {
          $flabel.attr("for", attrs.id);
        }

        $flabel.text(flabelText);
        $flabelContainer.addClass('flabeled');
        element.parent().prepend($flabel);

        scope.flabelCtrl = controller;
        scope.$watch('flabelCtrl.$modelValue', checkValueLength);
        scope.$watch('flabelCtrl.$viewValue', checkValueLength);

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

        function getLabelText() {
          if (attrs.flabel.length) {
            return attrs.flabel;
          } else if (attrs.placeholder !== undefined && attrs.placeholder.length) {
            return attrs.placeholder;
          } else {
            return false;
          }
        }

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
