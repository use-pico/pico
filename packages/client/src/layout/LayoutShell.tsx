import {Providers} from "../provider/Providers";

export namespace LayoutShell {
	export type Props = Providers.Props;
}

export const LayoutShell = (props: LayoutShell.Props) => {
	return <Providers
		{...props}
	/>;
};
