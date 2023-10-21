export type TuplePathItem = {
    schema: "tuple";
    input: [any, ...any[]];
    key: number;
    value: any;
};
