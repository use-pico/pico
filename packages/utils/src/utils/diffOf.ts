export type IDiffOfType = (string | number)[];

export const diffOf = (alfa: IDiffOfType, beta: IDiffOfType): IDiffOfType =>
    alfa.filter((x) => !beta.includes(x));
