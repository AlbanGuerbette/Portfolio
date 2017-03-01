function CheckFormInput($element) {
  if ($element.val() === "") {
    $element.closest('.input__wrapper').removeClass('inputNotEmpty');
  } else {
    $element.closest('.input__wrapper').addClass('inputNotEmpty');
  }
}
$('.contact__input').each(function () {
  var $this = $(this);
  $this.blur(function () {
    CheckFormInput($this)
  });
  $this.keypress(function () {
    CheckFormInput($this)
  });
});


// menu handling
var fullpageMenu = $('#fullpage__menu');

var menuToggle = function() {
    $('.menu-section').toggleClass("on");
    $(".menu-toggle").toggleClass("on");
    fullpageMenu.toggleClass('hidden');
}

$(".menu-toggle").on('click', function () {
  menuToggle();
});

$('.menu__item').on('click', function () {
  if (!fullpageMenu.hasClass('hidden')) {
    menuToggle();
  }
});


// Scroll handling a[href*=#]
$('.bottom-arrow__link').on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 200, 'linear');
});


$('.menu__item').on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 300, 'linear');
});
