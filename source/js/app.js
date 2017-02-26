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
$(".menu-toggle").on('click', function() {
  $(this).toggleClass("on");
  $('.menu-section').toggleClass("on");
  $("nav ul").toggleClass('hidden');
});
