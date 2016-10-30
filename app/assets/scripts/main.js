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
