document.addEventListener('DOMContentLoaded', () => {
    const starsOuter = document.querySelector('.stars-outer');
    const starsInner = document.querySelector('.stars-inner');
    const ratingValue = document.querySelector('.rating-value');
    const ratingInput = document.getElementById('ratingInput');
    const setRatingButton = document.getElementById('setRatingButton');

    const maxStars = 5;

    function setRating(rating) {
        const ratingPercentage = (rating / maxStars) * 100;
        starsInner.style.width = `${ratingPercentage}%`;
        ratingValue.textContent = rating.toFixed(1);
    }

    setRatingButton.addEventListener('click', () => {
        let rating = parseFloat(ratingInput.value);
        if (isNaN(rating) || rating < 0 || rating > 5) {
            alert("Please enter a valid rating between 0 and 5.");
            return;
        }
        setRating(rating);
    });

    // Set initial rating
    setRating(0);
});
