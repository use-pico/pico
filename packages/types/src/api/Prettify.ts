export type Prettify<T> =
    {
        [k in keyof T]: T[k]
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    & {};
