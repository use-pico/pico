import {default as classNames} from "classnames";
import {twMerge}               from "tailwind-merge";

export namespace cn {
    export type ClassNames = classNames.ArgumentArray;

    export interface WithClass {
        /**
         * If you need to customize style of a component, pass a class names here.
         */
        cx?: ClassNames;
    }
}

export const cn = (...args: classNames.ArgumentArray) => {
    return twMerge(
        classNames(...args)
    );
};
