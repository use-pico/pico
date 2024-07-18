import { linkTo, type IHrefProps } from "@use-pico/common";
import { useNavigate } from "../router/useNavigate";
import { useParams } from "../router/useParams";

/**
 * Router with locale; expects "locale" parameter in Next.js `useParams` hook.
 */
export const useLocaleRouter = () => {
	const navigate = useNavigate();
	const { locale } = useParams<{
		locale: string;
	}>();
	return {
		locale,
		push: ({ href, query }: IHrefProps) => {
			return navigate(
				linkTo({
					href: `/${locale ?? ""}${href}`.replace(/\/\//gu, "/"),
					query,
				}),
			);
		},
	} as const;
};
