import { ListItemNode, ListNode } from "@lexical/list";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import {
	type InitialConfigType,
	LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { tvc } from "@use-pico/cls";
import type { SerializedEditor } from "lexical";
import type { FC } from "react";
import { ToolbarPlugin } from "./ToolbarPlugin";

export namespace Editor {
	export interface Props {
		namespace: string;
		editable?: boolean;
		placeholder: string;
		content?: SerializedEditor;
		withToolbar?: boolean;
		onSave?: ToolbarPlugin.onSave.Callback;
	}
}

export const Editor: FC<Editor.Props> = ({
	namespace,
	editable = true,
	placeholder,
	withToolbar = true,
	content,
	onSave,
}) => {
	const config: InitialConfigType = {
		namespace,
		editable,
		editorState(editor) {
			content &&
				editor.setEditorState(
					editor.parseEditorState(content.editorState),
				);
		},
		onError() {
			//
		},
		nodes: [
			ListNode,
			ListItemNode,
		],
		theme: {
			list: {
				ul: tvc([
					"list-disc",
					"pl-8",
				]),
			},
			text: {
				underline: tvc([
					"underline",
				]),
				strikethrough: tvc([
					"line-through",
				]),
				underlineStrikethrough: tvc([
					"line-through",
				]),
			},
		},
	};

	return (
		<LexicalComposer initialConfig={config}>
			<div
				className={tvc([
					"flex",
					"flex-col",
					"border",
					"border-slate-300",
					"rounded-md",
				])}
			>
				{withToolbar ? (
					<div
						className={tvc([
							"border-b",
							"border-slate-300",
							"bg-slate-50",
							"p-2",
						])}
					>
						<ToolbarPlugin onSave={onSave} />
					</div>
				) : null}
				<div
					className={tvc([
						"relative",
					])}
				>
					<RichTextPlugin
						contentEditable={
							<ContentEditable
								className={tvc([
									"h-full",
									"focus:outline-none",
									"p-4",
									"min-h-42",
								])}
								aria-placeholder={placeholder}
								placeholder={
									<div
										className={tvc([
											"absolute",
											"top-4",
											"left-4",
										])}
									>
										{placeholder}
									</div>
								}
							/>
						}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoFocusPlugin />
					<ListPlugin />
					<TabIndentationPlugin />
				</div>
			</div>
		</LexicalComposer>
	);
};
