/**
 * 
 * TimeOut Callback Hell
 */


console.log('Starting...');

wait(1000, () => {
    console.log('First step completed.');

    wait(2000, () => {
        console.log('Second step completed.');

        wait(3000, () => {
            console.log('Third step completed.');

            console.log('Finished.');
        });
    });
});

function wait(ms, callback) {
    setTimeout(callback, ms);
}


/** Resolution */


function waitResolution(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function example() {
    console.log('Starting resolution...');

    await waitResolution(1000); // Wait for 1 second

    console.log('First step completed resolution.');

    await waitResolution(2000); // Wait for another 2 seconds

    console.log('Second step completed resolution.');

    await waitResolution(3000); // Wait for yet another 3 seconds

    console.log('Third step completed resolution.');

    console.log('Finished.');
}

example();




/** API Example */

/*
Overview:
In this scenario, we'll fetch user data from JSONPlaceholder (a mock API service),
then fetch additional details for each user, and finally perform some processing on the combined data.

Steps:
1. Fetch user data from JSONPlaceholder.
2. For each user, fetch additional details.
3. Combine user data with additional details.
4. Perform processing on the combined data.

This code example demonstrates how to use asynchronous fetch API calls in JavaScript to achieve this.
*/

// Step 1: Fetch user data from JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(userData => {
        // Step 2: For each user, fetch additional details
        userData.forEach(user => {
            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                .then(response => response.json())
                .then(posts => {
                    // Combine user data with additional details
                    const combinedData = { ...user, posts };

                    // Step 3: Perform processing on the combined data
                    console.log('Processed data:', combinedData);
                })
                .catch(error => console.error('Error fetching additional details:', error));
        });
    })
    .catch(error => console.error('Error fetching user data:', error));


/** Resolution */

// Step 1: Fetch user data from JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return response.json();
    })
    .then(userData => {
        // Create an array of promises to fetch additional details for each user
        const detailPromises = userData.map(user => {
            return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch additional details');
                    }
                    return response.json();
                })
                .then(posts => {
                    return { ...user, posts }; // Combine user data with additional details
                });
        });

        // Step 3: Wait for all detail promises to resolve
        return Promise.all(detailPromises);
    })
    .then(combinedData => {
        // Step 4: Perform processing on the combined data
        combinedData.forEach(data => {
            console.log('Processed data:', data);
        });
    })
    .catch(error => console.error('Error:', error));

