// One Page Scroll
$(function(){

  $('#fullpage').fullpage({
    verticalCentered: false,
    onLeave: function(index, nextIndex, direction) {
      console.log(nextIndex);
      $('.fixed-menu__item').eq(nextIndex - 1).addClass('is-active')
        .siblings()
        .removeClass('is-active');
    }
  });

  $('.arrow-down').on('click', function(e) {
    e.preventDefault();
    $.fn.fullpage.moveSectionDown();
  });

  $('.fixed-menu__link, .nav__link').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
        href = parseInt($this.attr('href'));

    $this.closest('li').addClass('is-active')
      .siblings()
      .removeClass('is-active');

    $.fn.fullpage.moveTo(href);
  });

});

// Slider
$(function(){

  $('.slider__wrap').owlCarousel({
    slideSpeed : 800,
    paginationSpeed : 400,
    singleItem: true
  });

  var slider = $('.slider__wrap').data('owlCarousel');

  $('.slider__l-arrow').on('click', function(e) {
    e.preventDefault();
    slider.prev();
  });

  $('.slider__r-arrow').on('click', function(e) {
    e.preventDefault();
    slider.next();
  });

});
