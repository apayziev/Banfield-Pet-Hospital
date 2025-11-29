var elOpenModalButton = document.querySelector('.js-modal-open');
var elModal = document.querySelector('.js-modal');
var closeButton = document.querySelector('.exit-button');

if (elOpenModalButton) {
	elOpenModalButton.addEventListener('click', function () {
		elModal.classList.add('modal-open');
	});
}

if (closeButton) {
	closeButton.addEventListener('click', function () {
		elModal.classList.remove('modal-open');
	});
}

// FAQ section js

var elsqaItem = document.querySelectorAll('.faq-list__item');
var elsqaToggler = document.querySelectorAll('.faq-list__item__btn');

elsqaToggler.forEach(function (toggler) {
	toggler.addEventListener('click', function () {
		toggler.closest('.faq-list__item').classList.toggle('faq--open');
	});
});

// Hamburger code

var elHamburger = document.querySelector('.header__menu-button');
var elHeader = document.querySelector('.header');

if (elHamburger) {
	elHamburger.addEventListener('click', function () {
		elHeader.classList.toggle('header--active');
	});
}
