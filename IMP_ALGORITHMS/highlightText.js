const highlightText = (element, wordLookup, bgColor) => {
    const expression = new RegExp(wordLookup, 'g');
    element.innerHTML = element.innerHTML.replace(expression, (value) => {
        return `<span style="background-color: ${bgColor}">${value}</span>`
    })
}