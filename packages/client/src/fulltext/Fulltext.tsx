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
		/**
		 * When true, adds a submit button instead of using debounce
		 */
		withSubmit?: boolean;
	}
}

export const Fulltext: FC<Fulltext.Props> = ({
	ref,
	state: { value = "", set },
	textPlaceholder = "Fulltext (placeholder)",
	withSubmit = false,
	cls = FulltextCls,
	tweak,
}) => {
	const { slots } = useCls(cls, tweak);
	const [search, setSearch] = useState(value || "");
	const debounced = useDebouncedCallback((value) => {
		set(value);
	}, 500);

	const handleSubmit = () => {
		set(search);
	};

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
					if (!withSubmit) {
						debounced(event.target.value);
					}
				}}
				onKeyDown={(event) => {
					if (withSubmit && event.key === "Enter") {
						handleSubmit();
					}
				}}
			/>
			{withSubmit ? (
				<div
					data-ui="Fulltext-submit"
					className={slots.submit()}
				>
					<Icon
						icon={"icon-[lucide--send]"}
						size="sm"
						onClick={handleSubmit}
						tone={"neutral"}
						tweak={{
							slot: {
								root: {
									class: [
										"opacity-50",
										"hover:opacity-75",
									],
								},
							},
						}}
					/>
				</div>
			) : (
				value && (
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
				)
			)}
		</div>
	);
};
