export const chain = (value: any, chain: any[]) => {
    if (!chain.length) {
        console.warn("Chain does not have chaining values (an empty array).");
        return value;
    }
    const index = chain.indexOf(value);
    if (index === -1) {
        return chain[0];
    } else if ((index + 1) === chain.length) {
        return chain[0];
    }
    return chain[index + 1];
};
