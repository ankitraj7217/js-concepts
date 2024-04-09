// Function to fetch posts from JSONPlaceholder API
const fetchPosts = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json());
};

// Function to fetch comments from JSONPlaceholder API
const fetchComments = () => {
    return fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json());
};

// Function to fetch users from JSONPlaceholder API
const fetchUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
};

// Fetch data concurrently from all APIs using Promise.all()
Promise.all([fetchPosts(), fetchComments(), fetchUsers()])
    .then(([posts, comments, users]) => {
        // Display the fetched data
        console.log('Posts:', posts);
        console.log('Comments:', comments);
        console.log('Users:', users);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });




// Use Promise.allSettled() to fetch data from all APIs and wait for all promises to settle
Promise.allSettled([fetchPosts(), fetchComments(), fetchUsers()])
    .then(results => {
        // Display the results of all promises
        console.log("All Settled: ", results)
    });



// Function to simulate a slow fetch operation
const slowFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        }, 2000); // Simulating a slow fetch operation with a delay of 2 seconds
    });
};

const fetchDataWithUrl = (url) => {
    return fetch(url)
        .then(response => response.json())
        .then(data => ({ data, url }))
        .catch(error => ({ error, url }));
};



// Use Promise.race() to fetch data from all APIs and get the result of the first settled promise
Promise.race([
    fetchDataWithUrl('https://jsonplaceholder.typicode.com/posts'),
    fetchDataWithUrl('https://jsonplaceholder.typicode.com/comments'),
    fetchDataWithUrl('https://jsonplaceholder.typicode.com/users')
])
    .then(({ data, url }) => {
        // Display which API got resolved first
        console.log(`Promise.race resolved from API: ${url}`);
    })
    .catch(({ error, url }) => {
        console.log(`Promise.race rejected with ${error} from API: ${url}`);
    });


// Use Promise.any() to fetch data from all APIs and get the first fulfilled promise
Promise.any([
    fetchDataWithUrl('https://jsonplaceholder.typicode.com/posts'),
    fetchDataWithUrl('https://jsonplaceholder.typicode.com/comments'),
    fetchDataWithUrl('https://jsonplaceholder.typicode.com/users')
])
    .then(({ data, url }) => {
        // Display which API got resolved first
        console.log(`Promise.any resolved from API: ${url}`);
    })
    .catch(({ error, url }) => {
        console.log(`Promise.any rejected with ${error} from API: ${url}`);
    });

