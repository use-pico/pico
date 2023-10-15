import {IconSearch}           from "@tabler/icons-react";
import {WithTranslationStore} from "@use-pico/i18n";
import {
    type FilterSchema,
    type OrderBySchema
}                             from "@use-pico/query";
import {type WithSourceQuery} from "@use-pico/rpc";
import {
    Container,
    Result,
    Status,
    WithIcon
}                             from "@use-pico/ui";
import {type z}               from "@use-pico/utils";
import {
    type FC,
    useCallback
}                             from "react";

export namespace TableCountResult {
    export interface Props<
        TSchema extends z.ZodSchema,
        TFilterSchema extends FilterSchema,
        TOrderBySchema extends OrderBySchema,
    > {
        withSourceQuery: WithSourceQuery<TSchema, TFilterSchema, TOrderBySchema>;
        Empty?: FC;
    }
}

export const TableCountResult = <
    TSchema extends z.ZodSchema,
    TFilterSchema extends FilterSchema,
    TOrderBySchema extends OrderBySchema,
>(
    {
        withSourceQuery,
        Empty,
    }: TableCountResult.Props<TSchema, TFilterSchema, TOrderBySchema>
) => {
    const {namespace} = WithTranslationStore.use(({namespace}) => ({namespace}));
    const countResult = withSourceQuery.useCount();

    const Empty$ = useCallback(() => <Status
        title={"empty.title"}
        message={"empty.message"}
    />, []);
    const WithEmpty = Empty || Empty$;

    return <>
        {countResult.data && !countResult.data.count && countResult.data.where > 0 && <Container size={"md"}>
            <Result
                icon={<WithIcon
                    size={"xl"}
                    icon={<IconSearch size={256}/>}
                />}
                withTranslation={{
                    namespace,
                    label: "filtered",
                }}
            />
        </Container>}
        {countResult.data && !countResult.data.where && <WithEmpty/>}
    </>;
};
