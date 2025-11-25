const slides = document.getElementsByClassName('carousel__slide');
let currentSlide = 1;

function next() {
    if(currentSlide === slides.length) {
        currentSlide = 1;
    } else {
        currentSlide++;
    }
    updateCarouselTrackPosition();
}
function previous() {
    if(currentSlide === 1) {
        currentSlide = slides.length;
    } else {
        currentSlide--;
    }
    updateCarouselTrackPosition();
}
function updateCarouselTrackPosition() {
    document.querySelector('.carousel__track').style.transform = `translateX(${-100 * (currentSlide - 1)}%)`;
}
function jumpToSlide(slide) {
    currentSlide = slide;
    updateCarouselTrackPosition();
}

document.querySelector('.carousel__previous').addEventListener('click', previous);
document.querySelector('.carousel__next').addEventListener('click', next);
const dots = document.querySelectorAll('.carousel__dots button');
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        jumpToSlide(index + 1);
    });
});