const observer = new IntersectionObserver((entries) => {
    // fires at start, when enters or leaves the viewport
    entries.forEach(entry => {
        console.log("Intersection Observed.");
        console.log("entry: ", entry);
        const percentageVisible = Math.round(entry.intersectionRatio * 100, 2);

        if (entry.isIntersecting) {
            console.log(`${percentageVisible}% of Ad is visible.: `, entry.target);
        } else {
            console.log("Ad is not visisble.");
        }
    }) 
}, {
    threshold: [0, 0.25] // how much is visible to fire the event.it is from 0 to 1.
        // fires for both the entry and leave. with x and 1 - x.  for last leave
});

const ad = document.querySelector("#io");
console.log(ad)
observer.observe(ad);
// observer.observe(ad2); // can run forEach and attach each element.
// use date.now() to check how long it was there..use elseif(isVisble) and threshold only 0.5
// observe.unobserve(targetElement or entry)