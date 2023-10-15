import {
    type IProvidersProps,
    Providers
} from "../provider/Providers";

export type ILayoutShellProps = Omit<IProvidersProps, "emotionCache" | "queryClient">;

export const LayoutShell = (props: ILayoutShellProps) => {
    return <Providers
        {...props}
    />;
};
