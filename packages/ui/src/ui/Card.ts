"use client";

import {type Card}           from "@mantine/core";
import {type ComponentProps} from "react";

export {Card} from "@mantine/core";
export type ICardProps<TComponent = "div"> = ComponentProps<typeof Card<TComponent>>;
