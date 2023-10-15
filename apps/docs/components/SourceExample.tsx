import {
    Tab,
    Tabs
} from "nextra-theme-docs";
import {
    type FC,
    type PropsWithChildren,
    type ReactNode
} from "react";

export type ISourceExampleProps = PropsWithChildren<{
    example: ReactNode;
}>

export const SourceExample: FC<ISourceExampleProps> = ({
                                                           example,
                                                           children
                                                       }) => {
    return <Tabs items={[
        "Example",
        "Code",
    ]}>
        <Tab>
            {example}
        </Tab>
        <Tab>
            {children}
        </Tab>
    </Tabs>;
};
