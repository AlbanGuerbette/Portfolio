function checkFormInput($element) {
  if ($element.val() === '') {
    $element.closest('.input__wrapper').removeClass('inputNotEmpty');
  } else {
    $element.closest('.input__wrapper').addClass('inputNotEmpty');
  }
}
$('.contact__input').each(function () {
  const $this = $(this);
  $this.blur(() => checkFormInput($this));
  $this.keypress(() => checkFormInput($this));
});

// menu handling
const fullpageMenu = $('#fullpage__menu');

const menuToggle = function () {
  $('.menu-section').toggleClass('on');
  $('.menu-toggle').toggleClass('on');
  fullpageMenu.toggleClass('hidden');
};

$('.menu-toggle').on('click', () => menuToggle());

$('.menu__item').on('click', () => {
  if (!fullpageMenu.hasClass('hidden')) {
    menuToggle();
  }
});

// Scroll handling a[href*=#]
$('.bottom-arrow__link').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 200, 'linear');
});

$('.menu__item').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 300, 'linear');
});
