function debounce(fn, delay) {
    let timeOut;
    let counter = 0;

    return function(...args) {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            fn.apply(this, args)
            counter++;
            console.log("Function called now: ", counter);
        }, delay)
    }
}

const input = document.querySelector("input");

const check1 = debounce(() => {console.log("check1")}, 400);
const check2 = debounce(() => {console.log("check2")}, 400)

check1()
check2()


// only one function is attached. can check from above code.
input.addEventListener("input", debounce((e) => {
    console.log("event: ", e.target.value);
},400))