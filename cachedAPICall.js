const cachedAPICall = (time) => {
    const cache = {};
    return function async(url, config = {}) {
        const key = `${url}${JSON.stringify(config)}`;
        const entry = cache[key];

        if (!entry || Date.now() > entry.expiry) {
            // Make an api call


            // Store entry
            cache[key] = {value: resp, expiry: Date.now() + time};
        } 

        return cache[key].value;
    }
}
