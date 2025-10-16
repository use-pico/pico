import { useCls } from "@use-pico/cls";
import { type StateType, translator } from "@use-pico/common";
import { type FC, type Ref, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Icon } from "../icon/Icon";
import { FulltextCls } from "./FulltextCls";

export namespace Fulltext {
	export type Value = string | undefined | null;
	export type State = StateType<Value>;
	export type OnFulltext = (text: Value) => void;

	export interface Props extends FulltextCls.Props {
		ref?: Ref<HTMLInputElement>;
		state: State;
		textPlaceholder?: string;
	}
}

export const Fulltext: FC<Fulltext.Props> = ({
	ref,
	state: { value = "", set },
	textPlaceholder = "Fulltext (placeholder)",
	cls = FulltextCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak);
	const [search, setSearch] = useState(value || "");
	const debounced = useDebouncedCallback((value) => {
		set(value);
	}, 500);

	return (
		<div
			data-ui="Fulltext-root"
			className={slots.root()}
		>
			<div
				data-ui="Fulltext-search"
				className={slots.search()}
			>
				<Icon
					icon={"icon-[material-symbols-light--search]"}
					size={"sm"}
				/>
			</div>
			<input
				data-ui="Fulltext-input"
				ref={ref}
				value={search}
				className={slots.input()}
				type={"text"}
				placeholder={translator.text(textPlaceholder)}
				onChange={(event) => {
					setSearch(event.target.value);
					debounced(event.target.value);
				}}
			/>
			{value && (
				<div
					data-ui="Fulltext-clear"
					className={slots.clear()}
				>
					<Icon
						icon={"icon-[gridicons--cross]"}
						size="sm"
						tone={"secondary"}
						onClick={() => {
							setSearch("");
							set("");
						}}
					/>
				</div>
			)}
		</div>
	);
};
