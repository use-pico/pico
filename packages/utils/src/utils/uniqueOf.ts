/**
 * Returns unique array; if a key is provided, it's used to compute unique values.
 *
 * @param array
 * @param key
 */
export const uniqueOf = <T>(array: T[], key?: keyof T): T[] => {
    return key ? [...new Map(array.map(item => [item[key], item])).values()] : [...new Set(array)];
};
