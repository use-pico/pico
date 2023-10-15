import {type WithMutation} from "@pico/rpc";
import {
    type RequestSchema,
    type ResponseSchema
}                          from "@pico/schema";

export type IWithLogoutMutation = WithMutation<RequestSchema, ResponseSchema>;
