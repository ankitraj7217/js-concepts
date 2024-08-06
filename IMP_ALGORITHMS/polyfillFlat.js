const polyFillFlatten = (arr, depth) => {
    if (depth <= 0) return arr; // Base case: return the array if depth is 0 or negative

    return arr.reduce((prev, curr) => {
        return prev.concat(Array.isArray(curr) ? polyFillFlatten(curr, depth - 1) : curr);
    }, []);
};
