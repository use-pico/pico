import {type ErrorMessage} from "../api/ErrorMessage";

export const errorOf = (error: ErrorMessage): string => error === "function" ? (error as unknown as (() => string))() : error as string;
