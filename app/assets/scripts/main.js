// One Page Scroll
$(function() {

  $('#fullpage').fullpage({
    verticalCentered: false,
    onLeave: function(index, nextIndex, direction) {
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
$(function() {

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

// Vertical Accordeon
$(function() {

  $('.team__link').on('click', function(e) {
    e.preventDefault();

    var $this = $(this),
        item = $this.closest('.team__item'),
        container = $this.closest('.team__accord'),
        items = container.find('.team__item'),
        content = item.find('.team__info'),
        otherContent = container.find('.team__info'),
        contentHeight = content.find('.team__info-wrap').outerHeight();

    if (item.hasClass('is-active')) {
      item.removeClass('is-active');
      content.height(0);
    }
    else {
      item.addClass('is-active')
        .siblings()
        .removeClass('is-active');
      otherContent.height(0);
      content.height(contentHeight);
    }
  });

});

// Horisontal Accordeon
$(function() {

  $('.menu-accord__trigger').on('click', function(event) {
    event.preventDefault();

    var $this = $(this),
        item = $this.closest('.menu-accord__item');

    if (!item.hasClass('is-active')) {
      item.addClass('is-active')
        .siblings()
        .removeClass('is-active');
    }
    else {
      item.removeClass('is-active');
    }
  });

  $(document).on('click', function(event) {
    var menu = $(event.target).closest('.menu-accord'),
        items = $('.menu-accord__item');

    if (!menu.length) {
      items.removeClass('is-active');
    }
  });

});

// Input Mask
$(function() {
  $('#phone-mask').inputmask("+7 (999) 99 99 99");
});

// Fancybox
$(function() {
  $(".fancybox").fancybox({
    width: 460,
    height: 'auto',
    padding: 0,
    fitToView: false,
    autoSize: false,
    closeBtn: false
  });

  $('.review-tv__close').on('click', function(e){
    e.preventDefault();
    $.fancybox.close();
  });
});
