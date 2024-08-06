document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    header.focus()
})

function createElement(frontOrBack) {
    let topContainer;
    if (frontOrBack) {
        topContainer = document.getElementsByClassName("front-card")[0];
    } else {
        topContainer = document.getElementsByClassName("back-card")[0];
    }
    const headerEle = document.createElement("h2");
    headerEle.textContent = `Ankit Raj -  ${frontOrBack ? "Front" : "Back"}`;
    const imgEle = document.createElement("img");
    imgEle.src = `https://picsum.photos/${frontOrBack ? "240" : "250"}`;
    imgEle.alt = "Image";
    if (frontOrBack)
        imgEle.setAttribute("rel", "preload");

    if (topContainer) {
        topContainer.replaceChildren();
        topContainer.append(headerEle, imgEle)
    }
}

createElement(true);
createElement(false);

const cardContainer = document.querySelector('.card-container');

cardContainer.addEventListener('keydown', function(event) {
    console.log("event: ", event)
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
        // Prevent default behavior
        // event.preventDefault();
        // Flip the card
        console.log(event)
    }
});


// const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// if (prefersReducedMotion) {
//     // Reduced motion preference is enabled
//     console.log('Animations are disabled or reduced by user preference');
//   } else {
//     // Reduced motion preference is not enabled
//     console.log('Animations are enabled');
//   }


