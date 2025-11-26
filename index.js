let currentSlide = 1;
const slides = document.getElementsByClassName('carousel__slide');
const length = slides.length;
const carousel__track = document.querySelector('.carousel__track');
const button_previous = document.querySelector('.carousel__previous');
const button_next = document.querySelector('.carousel__next');
const dots = document.querySelectorAll('.carousel__dots button');

carousel__track.style.width = `${length * 100}%`;

button_previous.addEventListener('click', previous);
button_next.addEventListener('click', next);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        jumpToSlide(index + 1);
    });
    dot.setAttribute('data-slide', index);
});
for(const slide of slides) {
    slide.style.width = 100/length + '%';
}

udpateDots();

function next() {
    if(currentSlide === length) {
        currentSlide = 1;
    } else {
        currentSlide++;
    }
    updateCarouselTrackPosition();
}

function previous() {
    if(currentSlide === 1) {
        currentSlide = length;
    } else {
        currentSlide--;
    }
    updateCarouselTrackPosition();
}

function updateCarouselTrackPosition() {
    carousel__track.style.transform = `translateX(${-100/length * (currentSlide - 1)}%)`;
    udpateDots();
}

function udpateDots() {
    dots.forEach((dot) => {
        dot.classList.remove('carousel__dots--active');
    });
    dots[currentSlide - 1].classList.add('carousel__dots--active');
}

function jumpToSlide(slide) {
    currentSlide = slide;
    updateCarouselTrackPosition();
}

