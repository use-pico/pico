export const withBool = (boolish: any, fallback: boolean) => {
    return boolish === undefined ? fallback : boolish;
};
