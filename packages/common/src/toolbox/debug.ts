export const debug = (message: any, ...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
        console.debug(message, ...args);
    }
};
