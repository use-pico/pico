import { type StateType, translator } from "@use-pico/common";
import { type FC, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useCls } from "../hooks/useCls";
import { Icon } from "../icon/Icon";
import { FulltextCls } from "./FulltextCls";

export namespace Fulltext {
	export type Value = string | undefined | null;
	export type State = StateType<Value>;
	export type OnFulltext = (text: Value) => void;

	export interface Props extends FulltextCls.Props {
		state: State;
		textPlaceholder?: string;
	}
}

export const Fulltext: FC<Fulltext.Props> = ({
	state: { value = "", set },
	textPlaceholder,
	variant,
	tva = FulltextCls,
	cls,
}) => {
	const { slots } = useCls(tva, variant, cls);
	const [search, setSearch] = useState(value || "");
	const debounced = useDebouncedCallback((value) => {
		set(value);
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
						set("");
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
