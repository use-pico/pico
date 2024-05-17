export const mapEmptyToNull = <TObject extends object>(object: TObject): TObject => {
    return Object
        .keys(object)
        .reduce<any>(
            (acc, key) => {
                acc[key] = object[key as keyof TObject] === "" ? null : object[key as keyof TObject];
                return acc;
            },
            {}
        );
};
