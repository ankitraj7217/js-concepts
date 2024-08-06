;(function(){
    const elementInner = document.querySelector("#progress-bar__inner");
    const elementCounter = document.querySelector("#progress-bar__text");
    let counter = 1;
    const intervalID = setInterval(() => {
        elementInner.style.width = `${counter++}%`;
        if (counter === 50) {
            elementCounter.style.color = "white";
        }
        if (counter > 100) {
            clearInterval(intervalID);
        }
    }, 100)

})();