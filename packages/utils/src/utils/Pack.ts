/**
 * Simple wrapper around current background implementation of stringify/parse.
 */
export class Pack {
    public static async pack<T>(input: T): Promise<string> {
        return import("devalue").then(({stringify}) => stringify(input));
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
        return import("devalue").then(({stringify}) => stringify(input));
    }

    public static async unpack<T>(input: string): Promise<T> {
        return import("devalue").then(({parse}) => parse(input));
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
        return import("devalue").then(({parse}) => parse(input));
    }
}
