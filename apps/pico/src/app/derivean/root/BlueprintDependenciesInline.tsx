import { More } from "@use-pico/client";
import { type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { BlueprintDependenciesInlineCss } from "~/app/derivean/root/BlueprintDependenciesInlineCss";

export namespace BlueprintDependenciesInline {
	interface Data extends IdentitySchema.Type {
		name: string;
		blueprintId: string;
		dependencyId: string;
	}

	export interface Props
		extends BlueprintDependenciesInlineCss.Props<More.PropsEx<Data>> {
		dependencies: Data[];
	}
}

export const BlueprintDependenciesInline: FC<
	BlueprintDependenciesInline.Props
> = ({
	dependencies,
	variant,
	tva = BlueprintDependenciesInlineCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<More
			items={dependencies}
			render={({ entity }) => {
				return (
					<div className={tv.item()}>
						<div>{entity.name}</div>
					</div>
				);
			}}
			{...props}
		/>
	);
};
