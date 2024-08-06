//get the refrence of div in js using query selector for both inner and outer div
const progressbar= document.querySelector(".outer");
const innerbar= document.querySelector(".inner");

//make initial value as 0
var currentdeg=0;

//define a interval which will run with the interval of 15 milisecond [increase or decrease the value of
//timer as slow or fast you what your progress bar to be]
const myInterval= setInterval(()=>{
    //increment degree with the value of 1 each time function is called
    currentdeg=currentdeg+1;

    //convert the degree to the percentage so that you can update value in html
    var deg= (currentdeg/360)*100;

    //increment the degree value
    progressbar.style.setProperty('background', `conic-gradient(red ${currentdeg}deg, rgb(255, 255, 255) 0deg)`);

//     progressbar.style.setProperty('background', 
//     `repeating-conic-gradient(
//         red 0deg ${currentdeg}deg, 
//         white ${currentdeg}deg ${currentdeg + 10}deg
//     )`
//   );

    //update the inner div value as percentage
    innerbar.innerText=`${Math.floor(deg)}%`;

    //stop or clear interval at particular value here i am using 60 % as max value
    //after which our interval will stop
    if(deg>100)
    {
        clearInterval(myInterval);
    }
    },
15);