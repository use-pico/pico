import type { FC } from "react";
import { Editor } from "./Editor";

export namespace PreviewEditor {
	export interface Props extends Editor.Props {
		//
	}
}

export const PreviewEditor: FC<PreviewEditor.Props> = (props) => {
	return (
		<Editor
			editable={false}
			withToolbar={false}
			{...props}
		/>
	);
};
