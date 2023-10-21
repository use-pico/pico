export type RecordPathItem = {
    schema: "record";
    input: Record<string | number | symbol, any>;
    key: string | number | symbol;
    value: any;
};
