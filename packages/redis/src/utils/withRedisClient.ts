import {Redis} from "ioredis";

export namespace withRedisClient {
    export interface Props {
        url?: string;
    }
}

export const withRedisClient = (
    {
        url = process.env.REDIS_URL,
    }: withRedisClient.Props
) => {
    if (!url) {
        throw new Error(`No env.REDIS_URL provided!`);
    }
    return new Redis(url, {
        lazyConnect: true,
    });
};
