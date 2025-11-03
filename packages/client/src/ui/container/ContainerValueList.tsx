import type { EntitySchema } from "@use-pico/common/schema";
import type { ReactNode } from "react";
import { Badge } from "../badge/Badge";
import { Tx } from "../tx/Tx";
import { Container } from "./Container";

export namespace ContainerValueList {
	export interface Props<TItem extends EntitySchema.Type> {
		/**
		 * Translation label for the list title.
		 */
		textTitle: string;
		/**
		 * Translation label for the empty state.
		 */
		textEmpty: string;
		/**
		 * Array of items to display.
		 */
		items: TItem[];
		/**
		 * Function to render each item.
		 */
		render: (item: TItem) => ReactNode;
	}
}

export const ContainerValueList = <TItem extends EntitySchema.Type>({
	textTitle,
	textEmpty,
	items,
	render,
}: ContainerValueList.Props<TItem>) => {
	return (
		<Container height={"auto"}>
			<Badge
				theme={"light"}
				tweak={{
					slot: {
						root: {
							class: [
								"flex",
								"flex-col",
								"items-start",
								"h-fit",
								"w-full",
							],
							token: [
								"round.md",
								"square.md",
							],
						},
					},
				}}
			>
				<Tx
					label={textTitle}
					preset={"label"}
				/>
			</Badge>

			<Container
				layout={"vertical-flex"}
				gap={"sm"}
				square={"sm"}
				height={"auto"}
			>
				{items.map((item) => (
					<Badge
						key={item.id}
						tone={"secondary"}
						theme={"light"}
						tweak={{
							slot: {
								root: {
									class: [
										"flex",
										"flex-col",
										"items-start",
										"h-fit",
										"w-full",
									],
									token: [
										"round.md",
										"square.md",
									],
								},
							},
						}}
					>
						{render(item)}
					</Badge>
				))}

				{items.length === 0 && <Tx label={textEmpty} />}
			</Container>
		</Container>
	);
};
