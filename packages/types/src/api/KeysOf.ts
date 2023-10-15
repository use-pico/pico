export namespace KeysOf {
    export type Keys<TObject extends object> = Extract<keyof TObject, string>;
}
