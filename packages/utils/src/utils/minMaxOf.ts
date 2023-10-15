export type IMinMaxOfProps = {
    min?: number;
    max: number;
    value: number;
}

export const minMaxOf = ({
                             min = 0,
                             max,
                             value
                         }: IMinMaxOfProps) => {
    return Math.min(Math.max(value, min), max);
};
