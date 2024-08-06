const user = {
    name: "AR",
    me: function() {
        console.log(this.name)
    }
}

user.me()
setTimeout(user.me, 1000); // passed as a reference..so, called via window
setTimeout(() => user.me(), 2000); // called via user.me
setTimeout(function(){user.me()}, 3000); // called vua user.me


var length = 4;
function callback() {
    console.log("from callback: ", this.length);
}

const obj = {
    length: 5,
    method: function() {
        callback();

        return {
            // length: 6,
            method2: function() {
                console.log("from method2: ", this.length, this);
            }
        }
    },
    method4: function() {
        //arguments is an obj, so, it will also return based on arguments length if passed a callback with this
        console.log("from arguments: ", arguments[0]()) 
    }
}

console.log(obj.method().method2())
console.log(obj.method())


const obj2 = {
    method5: function() {
        console.log("from method5: ", this.length, this)
    }
}

obj2.method5();