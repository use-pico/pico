import { Icon, More } from "@use-pico/client";
import { toHumanNumber, type IdentitySchema } from "@use-pico/common";
import type { FC } from "react";
import { Building_Requirement_InlineCss } from "~/app/derivean/root/BlueprintDependenciesInlineCss";

export namespace Building_Requirement_Inline {
	interface Data extends IdentitySchema.Type {
		name: string;
		buildingBaseId: string;
		requirementId: string;
		amount: number;
	}

	interface Diff {
		buildingBaseId: string;
		count: number;
	}

	export interface Props
		extends Building_Requirement_InlineCss.Props<More.PropsEx<Data>> {
		requirements: Data[];
		diff?: Diff[];
	}
}

export const Building_Requirement_Inline: FC<
	Building_Requirement_Inline.Props
> = ({
	requirements,
	diff,
	variant,
	tva = Building_Requirement_InlineCss,
	css,
	...props
}) => {
	const tv = tva({ ...variant, css }).slots;

	return (
		<More
			items={requirements}
			render={({ entity }) => {
				const baseBuilding = diff?.find(
					(r) => r.buildingBaseId === entity.requirementId,
				);
				const amount =
					baseBuilding?.count ?
						baseBuilding.count - entity.amount
					:	-entity.amount;

				return (
					<div
						className={tv.item({
							css:
								amount >= 0 ?
									[]
								:	["text-red-700", "bg-red-100", "border-red-300"],
						})}
					>
						<div>{entity.name}</div>
						<div className={"text-md font-bold text-slate-500"}>
							x{toHumanNumber({ number: entity.amount })}
						</div>
						{diff ?
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

						:	null}
					</div>
				);
			}}
			{...props}
		/>
	);
};
