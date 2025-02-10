import { translator } from "@use-pico/common";
import type { FC } from "react";
import { useDebounce } from "../debounce/useDebounce";
import { Icon } from "../icon/Icon";
import { FulltextCss } from "./FulltextCss";

export namespace Fulltext {
	export type Value = string | undefined;
	export type OnFulltext = (text: Value) => void;

	export interface Props extends FulltextCss.Props {
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
	tva = FulltextCss,
	css,
}) => {
	const tv = tva({ ...variant, css }).slots;
	const [search, setSearch] = useDebounce(value, onFulltext, 500);

	return (
		<div className={tv.base()}>
			<div className={tv.search()}>
				<Icon
					icon={"icon-[material-symbols-light--search]"}
					variant={{ size: "xl" }}
				/>
			</div>
			<input
				value={search || ""}
				className={tv.input()}
				type={"text"}
				placeholder={
					textPlaceholder || translator.text("Fulltext (placeholder)")
				}
				onChange={(event) => {
					setSearch(event.target.value);
				}}
			/>
			{value && (
				<div
					className={tv.clear()}
					onClick={() => {
						onFulltext("");
					}}
				>
					<Icon
						icon={"icon-[gridicons--cross]"}
						variant={{ size: "md" }}
					/>
				</div>
			)}
		</div>
	);
};
