document.addEventListener('DOMContentLoaded', carousel);

function carousel() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach((carouselWrapper) => {
        createCarousel(carouselWrapper);
    });
}

async function createCarousel(carouselWrapper) {
    const imagesDataSrc = carouselWrapper.getAttribute('data-images');
    const imagesData = await getImagesData(imagesDataSrc);
    
    const length = imagesData.length;
    let currentSlide = 1;

    let track = document.createElement('div');
    track.classList.add('carousel__track');
    track.style.width = `${length * 100}%`;

    for (const image of imagesData) {
        const slide = document.createElement('div');
        slide.classList.add('carousel__slide');
        slide.style.width = 100/length + '%';

        const picture = document.createElement('picture');

        for(const source of image.sources) {
            const sourceElement = document.createElement('source');
            sourceElement.media = source.media;
            sourceElement.srcset = source.srcset;
            picture.appendChild(sourceElement);
        }

        const imgElement = document.createElement('img');
        imgElement.src = image.imgSrc;
        imgElement.srcset = image.imgSrcset;
        imgElement.alt = image.alt;
        imgElement.loading = "lazy";

        picture.appendChild(imgElement);
        slide.appendChild(picture);
        track.appendChild(slide);
    }

    carouselWrapper.appendChild(track);

    const previousButton = document.createElement('button');
    previousButton.classList.add('carousel__previous');
    previousButton.addEventListener('click', previous);
    carouselWrapper.appendChild(previousButton);

    const nextButton = document.createElement('button');
    nextButton.classList.add('carousel__next');
    nextButton.addEventListener('click', next);
    carouselWrapper.appendChild(nextButton);

    const dots = document.createElement('div');
    dots.classList.add('carousel__dots');
    
    for(let i = 1; i <= length; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('data-slide', i);
        dot.addEventListener('click', () => {
            jumpToSlide(i);
        })
        dots.appendChild(dot);
    }
    
    carouselWrapper.appendChild(dots);

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
        track.style.transform = `translateX(${-100/length * (currentSlide - 1)}%)`;
        udpateDots();
    }

    function udpateDots() {
        for (const dot of dots.children) {
            dot.classList.remove('carousel__dots--active');
        }
        dots.children[currentSlide - 1].classList.add('carousel__dots--active');
    }

    function jumpToSlide(slide) {
        currentSlide = slide;
        updateCarouselTrackPosition();
    }

}

async function getImagesData(src) {
    try { 
        const response = await fetch(src);
        if(!response.ok) {
            throw new Error("Could not fetch data");
        }
        const imagesData = await response.json();
        return imagesData;
    } catch(error) {
        console.error(error);
        return [];
    }
}

