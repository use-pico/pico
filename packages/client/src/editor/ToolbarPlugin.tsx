import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { tvc } from "@use-pico/cls";
import {
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	type LexicalEditor,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from "lexical";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { Action } from "../action/Action";

const LowPriority = 1;

function Divider() {
	return <div className={"h-6 border-l w-0.5 border-slate-300"} />;
}

export namespace ToolbarPlugin {
	export namespace onSave {
		export interface Props {
			editor: LexicalEditor;
		}

		export type Callback = (props: Props) => void;
	}

	export interface Props {
		onSave?: onSave.Callback;
	}
}

export const ToolbarPlugin: FC<ToolbarPlugin.Props> = ({ onSave }) => {
	const toolbarRef = useRef(null);
	const [editor] = useLexicalComposerContext();
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);

	const $updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			setIsBold(selection.hasFormat("bold"));
			setIsItalic(selection.hasFormat("italic"));
			setIsUnderline(selection.hasFormat("underline"));
			setIsStrikethrough(selection.hasFormat("strikethrough"));
		}
	}, []);

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					$updateToolbar();
				});
			}),
			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				(_payload, _newEditor) => {
					$updateToolbar();
					return false;
				},
				LowPriority,
			),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUndo(payload);
					return false;
				},
				LowPriority,
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				(payload) => {
					setCanRedo(payload);
					return false;
				},
				LowPriority,
			),
		);
	}, [
		editor,
		$updateToolbar,
	]);

	return (
		<div
			className={tvc([
				"flex",
				"flex-row",
				"items-center",
				"gap-2",
			])}
			ref={toolbarRef}
		>
			<div
				className={tvc([
					"flex",
					"flex-row",
					"items-center",
					"gap-1",
				])}
			>
				<Action
					iconEnabled={"icon-[material-symbols-light--undo]"}
					iconDisabled={"icon-[material-symbols-light--undo]"}
					disabled={!canUndo}
					onClick={() => {
						editor.dispatchCommand(UNDO_COMMAND, undefined);
					}}
				/>
				<Action
					iconEnabled={"icon-[material-symbols-light--redo]"}
					iconDisabled={"icon-[material-symbols-light--redo]"}
					disabled={!canRedo}
					onClick={() => {
						editor.dispatchCommand(REDO_COMMAND, undefined);
					}}
				/>
			</div>
			<Divider />
			<div
				className={tvc([
					"flex",
					"flex-row",
					"items-center",
					"gap-1",
				])}
			>
				<Action
					iconEnabled={"icon-[material-symbols--format-bold]"}
					iconDisabled={"icon-[material-symbols--format-bold]"}
					onClick={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
					}}
					cls={({ what }) => ({
						variant: what.variant({
							disabled: !isBold,
						}),
					})}
				/>
				<Action
					iconEnabled={"icon-[material-symbols--format-italic]"}
					iconDisabled={"icon-[material-symbols--format-italic]"}
					onClick={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
					}}
					cls={({ what }) => ({
						variant: what.variant({
							disabled: !isItalic,
						}),
					})}
				/>
				<Action
					iconEnabled={"icon-[material-symbols--format-underlined]"}
					iconDisabled={"icon-[material-symbols--format-underlined]"}
					onClick={() => {
						editor.dispatchCommand(
							FORMAT_TEXT_COMMAND,
							"underline",
						);
					}}
					cls={({ what }) => ({
						variant: what.variant({
							disabled: !isUnderline,
						}),
					})}
				/>
				<Action
					iconEnabled={
						"icon-[material-symbols--format-strikethrough]"
					}
					iconDisabled={
						"icon-[material-symbols--format-strikethrough]"
					}
					onClick={() => {
						editor.dispatchCommand(
							FORMAT_TEXT_COMMAND,
							"strikethrough",
						);
					}}
					cls={({ what }) => ({
						variant: what.variant({
							disabled: !isStrikethrough,
						}),
					})}
				/>
			</div>
			<Divider />
			<div
				className={tvc([
					"flex",
					"flex-row",
					"items-center",
					"gap-1",
				])}
			>
				<Action
					iconEnabled={"icon-[material-symbols--format-align-left]"}
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
					}}
				/>
				<Action
					iconEnabled={"icon-[material-symbols--format-align-center]"}
					onClick={() => {
						editor.dispatchCommand(
							FORMAT_ELEMENT_COMMAND,
							"center",
						);
					}}
				/>
				<Action
					iconEnabled={"icon-[material-symbols--format-align-right]"}
					onClick={() => {
						editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
					}}
				/>
				<Action
					iconEnabled={
						"icon-[material-symbols--format-align-justify]"
					}
					onClick={() => {
						editor.dispatchCommand(
							FORMAT_ELEMENT_COMMAND,
							"justify",
						);
					}}
				/>
			</div>
			<Divider />
			<div
				className={tvc([
					"flex",
					"flex-row",
					"items-center",
					"gap-1",
				])}
			>
				<Action
					iconEnabled={"icon-[foundation--save]"}
					onClick={() => {
						onSave?.({
							editor,
						});
					}}
				/>
			</div>
		</div>
	);
};
