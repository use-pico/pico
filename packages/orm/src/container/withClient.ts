import {type PrismaClient} from "@prisma/client";
import {withService}       from "@use-pico/container";

export const withClient = withService<PrismaClient>("@use-pico/orm/Client");
