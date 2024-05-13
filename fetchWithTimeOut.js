const fetchWithTimeOut = (url, duration) => {
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const signal = controller.signal;
        let timerId;

        fetch(url, { signal })
            .then(async (resp) => {
                const data = await resp.json();
                clearTimeout(timerId)
                resolve(data);
            })
            .catch(err => reject(err));

        timerId = setTimeout(() => {
            controller.abort();
        }, duration)
    })
}

fetchWithTimeOut("https://jsonplaceholder.typicode.com/todos/1", 500)
    .then(res => console.log(res))
