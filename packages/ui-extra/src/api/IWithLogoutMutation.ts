import {type WithMutation} from "@use-pico/rpc";
import {
    type RequestSchema,
    type ResponseSchema
}                          from "@use-pico/schema";

export type IWithLogoutMutation = WithMutation<RequestSchema, ResponseSchema>;
