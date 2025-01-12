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

	interface Diff {
		buildingBaseId: string;
		count: number;
	}

	export interface Props
		extends BlueprintDependenciesInlineCss.Props<More.PropsEx<Data>> {
		dependencies: Data[];
		diff?: Diff[];
	}
}

export const BlueprintDependenciesInline: FC<
	BlueprintDependenciesInline.Props
> = ({
	dependencies,
	diff,
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
						{/* {diff ?
							amount >= 0 ?
								<Icon
									icon={"icon-[pajamas--check-sm]"}
									css={{
										base: ["text-emerald-600"],
									}}
								/>
							:	<div
									className={
										"flex flex-row gao-2 items-center text-sm text-red-500"
									}
								>
									<Icon
										icon={"icon-[charm--cross]"}
										css={{
											base: ["text-red-500"],
										}}
									/>
									({toHumanNumber({ number: amount })})
								</div>

						:	null} */}
					</div>
				);
			}}
			{...props}
		/>
	);
};
