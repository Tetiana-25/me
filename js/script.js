const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const close = document.querySelector('.menu__close');

hamburger.addEventListener('click', function() {
    menu.classList.add('active');
});
close.addEventListener('click', function() {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__values-item-value');
const lines = document.querySelectorAll('.skills__values__blocks .block_result');

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});