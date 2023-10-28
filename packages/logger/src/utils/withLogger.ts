import winston, {type LoggerOptions} from "winston";

export const withLogger = (
    id: string,
    options?: LoggerOptions
) => winston.loggers.get(id, options);
