export namespace ParamsOf {
    type IsParameter<TPart> = TPart extends `{${infer TParam}}` ? TParam : never;
    type Parse<TPath> = TPath extends `${infer A}/${infer B}` ? IsParameter<A> | Parse<B> : IsParameter<TPath>;
    export type Params<TPath> = {
        [TKey in Parse<TPath>]: string | number;
    }
}
