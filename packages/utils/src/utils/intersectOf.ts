export type IIntersectOfType = (string | number)[];

export const intersectOf = (
    alfa: IIntersectOfType,
    beta: IIntersectOfType
): IIntersectOfType => alfa.filter((x) => beta.includes(x));
