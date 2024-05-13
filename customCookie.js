// custom cookie


// default;
document.cookie = "name=blabla;max-age=1";
document.cookie = "blog=learner";

console.log(document.cookie);
setTimeout(() => {
    console.log(document.cookie);
}, 1500);


// custom cookie;

const separateKeyVal = (str) => {
    return str.split("=").map(s => s.trim());
}

const parseCustomCookie = (str) => {
    const [nameValue, ...rest] = str.split(";");
    const [key, val] = separateKeyVal(nameValue);
    const options = {};

    for (const option of rest) {
        const [key, val] = separateKeyVal(option);
        options[key] = val;
    }

    return {key, val, options};
}

const useMyCookie = () => {
    const store = new Map();

    Object.defineProperty(document, "myCookie", {
        configurable: true,
        set(value) {
            const {key, val, options} = parseCustomCookie(value);
            let expiry = Infinity;

            if ("max-age" in  options) {
                expiry = Date.now() + options["max-age"] * 1000;
            }

            store.set(key, {val, expiry});
        },
        get() {
            const currTime = Date.now();
            const res = [];
            
            for (const [key, {val, expiry}] of store) {
                if (currTime > expiry) {
                    store.delete(key);
                } else {
                    res.push(`${key}=${val}`);
                }
            }

            return res.join("; ");
        }
    })
};

useMyCookie();

document.myCookie = "name=blabla;max-age=1";
document.myCookie = "blog=learner";

console.log(document.myCookie);
setTimeout(() => {
    console.log(document.myCookie);
}, 1500);

