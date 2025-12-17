import { useCls } from "@use-pico/cls";
import { translator } from "@use-pico/common/translator";
import type { StateType } from "@use-pico/common/type";
import { type FC, type Ref, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMergeRefs } from "../../hook/useMergeRefs";
import { Icon } from "../../icon/Icon";
import { FulltextCls } from "./FulltextCls";

export namespace Fulltext {
	export type Value = string | undefined;
	export type State = StateType.State<Value>;
	export type OnFulltext = (text: Value) => void;

	export interface Props extends FulltextCls.Props {
		ref?: Ref<HTMLInputElement>;
		state: State;
		textPlaceholder?: string;
		/**
		 * When true, adds a submit button instead of using debounce
		 */
		withSubmit?: boolean;
		/**
		 * Minimum number of characters required to submit (default: 3)
		 */
		limit?: number;
	}
}

export const Fulltext: FC<Fulltext.Props> = ({
	ref,
	state: { value = "", set },
	textPlaceholder = "Fulltext (placeholder)",
	withSubmit = false,
	limit = 3,
	cls = FulltextCls,
	tweak,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const mergeRef = useMergeRefs([
		ref,
		inputRef,
	]);
	const { slots } = useCls(cls, tweak);
	const [search, setSearch] = useState(value || "");
	const debounced = useDebouncedCallback((value) => {
		set(value);
	}, 500);

	const isDisabled = withSubmit && search.length < limit;

	const handleSubmit = () => {
		if (isDisabled) {
			return;
		}
		inputRef.current?.blur();
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
					ui={{
						text: "sm",
					}}
				/>
			</div>

			<input
				data-ui="Fulltext-input"
				ref={mergeRef}
				value={search}
				className={slots.input()}
				type={"text"}
				placeholder={translator.text(textPlaceholder)}
				onChange={(event) => {
					setSearch(event.target.value);
					if (event.target.value === "") {
						set("");
					}
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
						onClick={handleSubmit}
						className={
							isDisabled
								? [
										"opacity-25",
										"cursor-not-allowed",
									]
								: [
										"opacity-50",
										"hover:opacity-75",
										"cursor-pointer",
									]
						}
						ui={{
							tone: "neutral",
							text: "sm",
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
							onClick={() => {
								setSearch("");
								set(undefined);
							}}
							ui={{
								tone: "secondary",
								text: "sm",
							}}
						/>
					</div>
				)
			)}
		</div>
	);
};
