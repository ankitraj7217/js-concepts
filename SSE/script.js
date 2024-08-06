document.addEventListener("DOMContentLoaded", () => {
    const eventContainer = document.getElementById('events');

    const evtSource = new EventSource("https://sse.dev/test");
    evtSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.textContent = `Received event at ${data.time}: ${data.message}`;
        eventContainer.appendChild(eventElement);
    };

    evtSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        const errorElement = document.createElement('div');
        errorElement.className = 'event error';
        errorElement.textContent = `Error: ${err}`;
        eventContainer.appendChild(errorElement);
    };
});


// import { useState, useEffect, useCallback } from 'react';

// const useFetch = (url, options = {}, delay = 300) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = useCallback(() => {
//     let isActive = true;
//     const controller = new AbortController();
//     const { signal } = controller;

//     setLoading(true);
//     setError(null);

//     fetch(url, { ...options, signal })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (isActive) {
//           setData(data);
//         }
//       })
//       .catch(error => {
//         if (isActive) {
//           setError(error);
//         }
//       })
//       .finally(() => {
//         if (isActive) {
//           setLoading(false);
//         }
//       });

//     return () => {
//       isActive = false;
//       controller.abort();
//     };
//   }, [url, options]);

//   useEffect(() => {
//     const handler = setTimeout(fetchData, delay);
//     return () => clearTimeout(handler);
//   }, [url, options, delay, fetchData]);

//   return { data, loading, error };
// };

// export default useFetch;

