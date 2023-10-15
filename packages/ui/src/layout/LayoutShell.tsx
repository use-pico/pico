import {Providers} from "../provider/Providers";

export namespace LayoutShell {
    export type Props = Omit<Providers.Props, "emotionCache" | "queryClient">;
}

export const LayoutShell = (props: LayoutShell.Props) => {
    return <Providers
        {...props}
    />;
};
