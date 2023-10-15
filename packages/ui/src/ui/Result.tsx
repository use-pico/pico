import {
    type IWithTranslation,
    Translation,
    WithTranslationProvider
}                from "@use-pico/i18n";
import {
    type FC,
    type PropsWithChildren,
    type ReactNode
}                from "react";
import {Divider} from "./Divider";
import {Stack}   from "./Stack";
import {Text}    from "./Text";
import {Title}   from "./Title";

export type IResultProps = PropsWithChildren<{
    /**
     * This provides translations in the context to all child components
     */
    withTranslation?: IWithTranslation;
    /**
     * Top part of the component (should be usually an icon).
     */
    icon?: ReactNode;
    /**
     * Postfix of the header part
     */
    postfix?: ReactNode;
}>;

/**
 * Because I didn't get a better name and it is historically based on Ant Design's Result component, this component
 * share the same name.
 *
 * Only it's cleaner and clever.
 */
export const Result: FC<IResultProps> = (
    {
        withTranslation,
        icon,
        postfix,
        children,
    }
) => {
    return <WithTranslationProvider
        withTranslation={withTranslation}
    >
        <Stack align={"center"}>
            {icon}
            <Title order={2}>
                <Translation withLabel={"title"}/>
            </Title>
            <Text c={"dimmed"}>
                <Translation withLabel={"subtitle"}/>
            </Text>
            {postfix ? <>
                <Divider/>
                {postfix}
            </> : null}
            {children}
        </Stack>
    </WithTranslationProvider>;
};
