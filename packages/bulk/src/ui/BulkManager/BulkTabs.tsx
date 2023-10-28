import {
    IconAlertTriangle,
    IconCheckbox,
    IconDatabasePlus,
    IconFileImport,
    IconTrophy
}                                 from "@tabler/icons-react";
import {Translation}              from "@use-pico/i18n";
import {type JobSchema}           from "@use-pico/job";
import {type WithQuery}           from "@use-pico/query";
import {type WithSourceQuery}     from "@use-pico/rpc";
import {type WithIdentitySchema}  from "@use-pico/schema";
import {
    Badge,
    EditIcon,
    Flex,
    Group,
    Tabs,
    WithIcon
}                                 from "@use-pico/ui";
import {type FC}                  from "react";
import {BulkItemStatus}           from "../../api/BulkItemStatus";
import {type IUseBulkJobManager}  from "../../api/IUseBulkJobManager";
import {type BulkItemQuerySchema} from "../../schema/BulkItemQuerySchema";
import {type BulkItemSchema}      from "../../schema/BulkItemSchema";
import {type BulkStatsSchema}     from "../../schema/BulkStatsSchema";
import {BulkJobTab}               from "./BulkJobTab";

export namespace BulkTabs {
    export interface Props {
        withBulkStats: WithQuery<WithIdentitySchema, BulkStatsSchema>;
        withSourceQuery: WithSourceQuery<BulkItemSchema, BulkItemQuerySchema>;
        useJobManager: IUseBulkJobManager;
        bulkId: string;

        onSuccess?(job: JobSchema.Type): void;
    }
}

export const BulkTabs: FC<BulkTabs.Props> = (
    {
        withBulkStats,
        withSourceQuery,
        useJobManager,
        bulkId,
        onSuccess,
    }
) => {
    const countStats = withBulkStats.useQueryEx({
        request: {
            id: bulkId,
        },
    });
    const statusList = [
        {
            icon:   <IconDatabasePlus/>,
            label:  "new",
            status: BulkItemStatus.NEW,
            count:  countStats.data?.statusCount.new,
        },
        {
            icon:   <IconFileImport/>,
            label:  "pending",
            status: BulkItemStatus.PENDING,
            count:  countStats.data?.statusCount.pending,
        },
        {
            icon:   <IconTrophy/>,
            label:  "success",
            status: BulkItemStatus.SUCCESS,
            count:  countStats.data?.statusCount.success,
        },
        {
            icon:   <IconAlertTriangle/>,
            label:  "error",
            status: BulkItemStatus.ERROR,
            count:  countStats.data?.statusCount.error,
        },
        {
            icon:   <IconCheckbox/>,
            label:  "settled",
            status: BulkItemStatus.SETTLED,
            count:  countStats.data?.statusCount.settled,
        },
    ] as const;

    return <Flex
        justify={"space-between"}
        align={"center"}
        mb={"sm"}
    >
        <Tabs.List>
            <Tabs.Tab
                value={"add"}
                leftSection={<WithIcon
                    icon={<EditIcon/>}
                />}
            >
                <Translation namespace={"common.bulk.tab"} withLabel={"add"}/>
            </Tabs.Tab>

            {statusList.map(item => <Tabs.Tab
                key={`bulk-tab-${item.label}`}
                value={item.label}
                leftSection={<WithIcon
                    icon={item.icon}
                />}
            >
                <Group>
                    <Translation namespace={"common.bulk.tab"} withLabel={item.label}/>
                    <Badge variant={"light"} size={"lg"}>{countStats.isSuccess ? item.count : "-"}</Badge>
                </Group>
            </Tabs.Tab>)}
        </Tabs.List>
        <BulkJobTab
            bulkId={bulkId}
            withBulkStats={withBulkStats}
            withSourceQuery={withSourceQuery}
            useJobManager={useJobManager}
            onSuccess={onSuccess}
        />
    </Flex>;
};
