document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const carouselChildren = Array.from(carousel.querySelectorAll('.carousel-child'));
    const childWidth = carouselChildren[0].offsetWidth;
    const cloneLimit = carouselChildren.length;
    let startEle = 0;
    let isReached = false;
    let buffer = 2 * cloneLimit; // Buffer size for cloned elements

    // Function to clone elements at the end
    function cloneElements() {
        if (!isReached) {
            isReached = true;
            requestAnimationFrame(() => {
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < cloneLimit; i++) {
                    const clonedEle = carouselChildren[startEle].cloneNode(true);
                    fragment.appendChild(clonedEle);
                    startEle = (startEle + 1) % cloneLimit;
                }
                carousel.appendChild(fragment);
                isReached = false;
            });
        }
    }

    // Function to remove elements from the beginning
    function removeElements() {
        requestAnimationFrame(() => {
            while (carousel.scrollLeft > buffer * childWidth) {
                carousel.removeChild(carousel.firstElementChild);
                carousel.scrollLeft -= childWidth; // Adjust scroll position after removing
            }
        });
    }

    // Event listener for scroll
    carousel.addEventListener('scroll', () => {
        const threshold = window.innerWidth + carousel.scrollLeft;
        const carouselWidth = carousel.scrollWidth;

        if (threshold >= carouselWidth - 50) {
            cloneElements();
        } else if (carousel.scrollLeft > buffer * childWidth) {
            removeElements();
        }
    });
});
