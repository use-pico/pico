import { useMutation } from "@tanstack/react-query";

export namespace useCycleMutation {
	export interface Props {
		//
	}
}

export const useCycleMutation = (props: useCycleMutation.Props) => {
	return useMutation({
		mutationKey: ["useCycleMutation"],
		async mutationFn() {
			return new Promise((res) => {
				setTimeout(() => {
					res(true);
				}, 2500);
			});
		},
	});
};
