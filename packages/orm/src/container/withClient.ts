import {withService}   from "@use-pico/container";
import {type Client}   from "../api/Client";
import {type Database} from "../api/Database";

export const withClient = withService<Client<Database>>("@use-pico/orm/Client");
export type withClient = typeof withClient;
