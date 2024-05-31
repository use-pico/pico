import {type IHrefProps, isString} from "@use-pico/common";
import {useLocaleRouter} from "./useLocaleRouter";

export namespace useWithLocaleRedirect {
	export type Redirect = ReturnType<typeof useWithLocaleRedirect>;
}

export const useWithLocaleRedirect = () => {
	const {push} = useLocaleRouter();
	return (href?: IHrefProps | string | null) => href && push(isString(href) ? {
		href,
	} : {
		href: href.href,
		query: href.query,
	});
};
