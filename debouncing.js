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
},400));


function debounceWithOptions(fn, delay, option = {leading: false, trailing: false}) {
    let timeOut;
    let isLeadingInvoked = false;

    return function(...args) {
        if (timeOut) {
            clearTimeout(timeOut);
        }
        // Please check this section of logic.
        if (!timeOut && option.leading) {
            fn.apply(this, args);
            isLeadingInvoked = true;
        } else {
            isLeadingInvoked = false;
        }

        timeOut = setTimeout(() => {
            if (option.trailing && !isLeadingInvoked) {
                fn.apply(this, args);
            }

            timeOut = null;
        }, delay)
    }
}

input.addEventListener("input", debounceWithOptions((e) => {
    console.log("event with options: ", e.target.value);
},400, {leading: true, trailing: true}));
