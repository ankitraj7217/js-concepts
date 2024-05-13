// Use of proxies in deprecation

// nobody is looking into documentations
// Also, don't want to break their existing codebases
// don't need to create new objects

const legacyFontSizes = {
    extraLarge: {
        replacementName: "gigantic",
        replacementValue: "gigantic"
    },
    extraSmall: {
        replacementName: "tiny",
        replacementValue: "tiny"
    }
}

const fontSizes = {
    small: "small",
    medium: "medium",
    large: "large",
    gigantic: "gigantic",
    tiny: "tiny"
}

const proxyFontSizesOptions = {
    get: (target, propName, receiver) => {
        if (propName in legacyFontSizes) {
            console.warn (`
                ${propName} is deprecated.
                Use ${legacyFontSizes[propName].replacementName} instead
            `)
            return legacyFontSizes[propName].replacementValue
        }

        return Reflect.get(target, propName, receiver)
    }
}

const proxiedFontSizes = new Proxy(fontSizes, proxyFontSizesOptions);

console.log(proxiedFontSizes.extraSmall)

export default fontSizes;