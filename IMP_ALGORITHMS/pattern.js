// Module Pattern


(function() {
    console.log("IIFE: ", this);
})()


const Module = (function() {
    console.log("2: ", this)
    function privateMethod() {
        console.log(this);
    }

    return {
        publicMethod: function() {
            console.log("inside publicmethod: ", this);
            // call privateMethod
            privateMethod();
        }
    }
})();

Module.publicMethod();
// Module.privateMethod();