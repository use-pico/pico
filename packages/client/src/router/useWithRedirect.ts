import { linkTo, type INavigate } from "@use-pico/common";
import { useNavigate } from "./useNavigate";

/**
 * Pure redirect without locale
 */
export const useWithRedirect = (): INavigate => {
	const navigate = useNavigate();
	return (href) => {
		if (href) {
			navigate(linkTo(href));
		}
	};
};
