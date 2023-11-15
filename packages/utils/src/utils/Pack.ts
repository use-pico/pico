import {
    parse,
    stringify
} from "devalue";

/**
 * Simple wrapper around current background implementation of stringify/parse.
 */
export class Pack {
    public static async pack<T>(input: T): Promise<string> {
        try {
            return stringify(input);
        } catch (error) {
            console.log("Input", input);
            console.error(error);
            throw error;
        }
    }

    /**
     * This method mirrors an input: null -> null, undefined -> undefined, but
     * anything else is stringified.
     */
    public static async packIf<T>(input?: T | null): Promise<string | null | undefined> {
        if (input === null) {
            return null;
        } else if (input === undefined) {
            return undefined;
        }
        return stringify(input);
    }

    public static async unpack<T>(input: string): Promise<T> {
        return parse(input);
    }

    /**
     * This method mirrors an input: null -> null, undefined -> undefined and strings are parsed.
     */
    public static async unpackIf<T>(input?: string | null): Promise<T | null | undefined> {
        if (input === null) {
            return null;
        } else if (input === undefined) {
            return undefined;
        }
        return parse(input);
    }
}
