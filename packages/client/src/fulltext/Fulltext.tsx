import { translator } from "@use-pico/common";
import { type FC, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Icon } from "../icon/Icon";
import { FulltextCls } from "./FulltextCls";

export namespace Fulltext {
	export type Value = string | undefined | null;
	export type OnFulltext = (text: Value) => void;

	export interface Props extends FulltextCls.Props {
		value?: Value;
		onFulltext: OnFulltext;
		textPlaceholder?: string;
	}
}

export const Fulltext: FC<Fulltext.Props> = ({
	value = "",
	onFulltext,
	textPlaceholder,
	variant,
	tva = FulltextCls,
	cls,
}) => {
	const { slots } = tva(variant, cls);
	const [search, setSearch] = useState(value || "");
	const debounced = useDebouncedCallback((value) => {
		onFulltext(value);
	}, 500);

	return (
		<div className={slots.base()}>
			<div className={slots.search()}>
				<Icon
					icon={"icon-[material-symbols-light--search]"}
					variant={{
						size: "xl",
					}}
				/>
			</div>
			<input
				value={search}
				className={slots.input()}
				type={"text"}
				placeholder={
					textPlaceholder || translator.text("Fulltext (placeholder)")
				}
				onChange={(event) => {
					setSearch(event.target.value);
					debounced(event.target.value);
				}}
			/>
			{value && (
				<div
					className={slots.clear()}
					onClick={() => {
						setSearch("");
						onFulltext("");
					}}
				>
					<Icon
						icon={"icon-[gridicons--cross]"}
						variant={{
							size: "md",
						}}
					/>
				</div>
			)}
		</div>
	);
};
