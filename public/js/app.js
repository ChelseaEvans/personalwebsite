(function() {
  'use strict';

  $(document).ready(function() {

    function smoothScroll() {
      $('a[href^="#"]').on('click',function (e) {
          e.preventDefault();

          var target = this.hash,
          $target = $(target);

          $('html, body').stop().animate({
              'scrollTop': $target.offset().top + -80
          }, 900, 'swing', function () {
              window.location.hash = target;
          });
      });
    }

    smoothScroll();
  });
}());
