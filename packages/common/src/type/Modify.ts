export type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
