const createNestingWithPrefix = (obj, prefix = "") => {
    let result = {};

    const isObject = val => val && typeof val === "object";

    for (const [key, value] of Array.isArray(obj) ? obj.entries() : Object.entries(obj)) {
        const newPrefix = `${prefix}${prefix ? '.' : ''}${key}`;
        
        if (isObject(value)) {
            result = {...result, ...createNestingWithPrefix(value, newPrefix)};
        } else {
            result[newPrefix] = value;
        }
    }

    return result;
}

const obj = {
    a: {
        b: {
            c: 2,
            d: [3, 4, {e: 5}]
        }
    },
    e: 6
}

console.log(createNestingWithPrefix(obj));
