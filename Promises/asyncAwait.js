const p1 = new Promise((res, rej) => setTimeout(() => {res("p1 10 sec")}, 10000))

const p2 = new Promise((res, rej) => setTimeout(() => {res("p2 5 sec")}, 5000))

async function example(){

    console.log("Hello World!")

    // const val1 = await new Promise((res, rej) => setTimeout(() => {res("p1 10 sec")}, 10000));
    const check1 = await p1
    // console.log("1st", val1)
    console.log("check1", check1)

    // const val2 = await new Promise((res, rej) => setTimeout(() => {res("p2 5 sec")}, 5000));
    const check2 = await p2
    // console.log("2nd", val2)
    console.log("check2", check2)
}

console.log("p1: ", p1)
console.log("p2: ", p2)
setTimeout(() => {
    console.log("inside timeout")
    example()
}, 10000)