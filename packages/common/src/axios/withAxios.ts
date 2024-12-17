import axios, { type AxiosInstance } from "axios";
import axiosRateLimit, { type rateLimitOptions } from "axios-rate-limit";

export namespace withAxios {
	export interface Props {
		instance?: AxiosInstance;
		limit?: rateLimitOptions;
	}
}

export const withAxios = ({ instance, limit }: withAxios.Props = {}) => {
	return axiosRateLimit(
		instance || axios,
		limit || {
			maxRequests: 5,
			perMilliseconds: 100,
		},
	);
};
