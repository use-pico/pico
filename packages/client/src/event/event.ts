import {type z}         from "zod";
import {useEventSource} from "./useEventSource";

/**
 * Typed event source handler.
 *
 * @group evemt
 */
export const event = <
    TSchema extends z.ZodSchema,
>(
    type: string,
    schema: TSchema,
    handler: useEventSource.Handler<TSchema>["handler"],
): useEventSource.Handler<TSchema> => ({
    type,
    schema,
    handler,
});
