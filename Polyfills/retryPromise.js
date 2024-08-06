const asyncDelay = async(delay) => {
    return new Promise((res, rej) => {
        setTimeout(() => res, delay)
    })
}


const retryPromise = async (asyncFn, retries = 3, delay = 50, finalError = 'Failed') => {
    try {
        return await asyncFn();
    } catch (e) {
        if (retries <= 0) {
            Promise.reject(finalError)
        }

        await asyncDelay(delay);

        return retryPromise(asyncFn, retries - 1, delay, finalError)
    }
}



