const slides = document.getElementsByClassName('carousel__slide');
const carousel__track = document.querySelector('.carousel__track');
let currentSlide = 1;

const dots = document.querySelectorAll('.carousel__dots button');
udpateDots();

document.querySelector('.carousel__previous').addEventListener('click', previous);
document.querySelector('.carousel__next').addEventListener('click', next);


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
    carousel__track.style.transform = `translateX(${-100 * (currentSlide - 1)}%)`;
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

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        jumpToSlide(index + 1);
    });
    dot.setAttribute('data-slide', index);
});