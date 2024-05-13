(function() {
    const input = document.querySelector("input");
    const suggestionsArea = document.querySelector(".suggestions");

    const getSuggestions = async () => {
        const resp = await fetch("https://random-word-api.herokuapp.com/word?number=5");
        const data = await resp.json();

        return data;
    }

    const processData = async (value) => {
        // suggestionsArea.innerHTML = "";   // won't work bcz of race condition..do it befire appending child.
        console.log("erased");
        if (!value) {
            return;
        }
        try {
            const resp = await getSuggestions(value);
            if (resp.length) {
                const ulEle = document.createElement("ul");
                resp.forEach(val => {
                    const listItem = document.createElement("li");
                    listItem.style.cursor = "pointer";
                    listItem.innerText = val;
                    ulEle.appendChild(listItem);
                });

                suggestionsArea.innerHTML = "";
                suggestionsArea.appendChild(ulEle);
            }
        } catch(e) {

        }
    }

    input.addEventListener("focus", () => {
        suggestionsArea.style.display = "block";
    });

    window.addEventListener("blur", (e) => {
        if (e.target === input || e.target === suggestionsArea) return;
        suggestionsArea.style.display = "none";
    });

    input.addEventListener('keyup', function(e) {
        processData(e.target.value);
    });

    suggestionsArea.addEventListener("click", (e) => {
        if(e.target === suggestionsArea) return;

        const txt  = e.target.innerText;
        input.value = txt;
        input.focus();
    })


})();