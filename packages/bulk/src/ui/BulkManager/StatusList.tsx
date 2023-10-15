import {
    IconAlertTriangle,
    IconCheckbox,
    IconDatabasePlus,
    IconFileImport,
    IconTrophy
}                                from "@tabler/icons-react";
import {WithTranslationProvider} from "@use-pico/i18n";
import {Status}                  from "@use-pico/ui";
import {BulkItemStatus}          from "../../api/BulkItemStatus";

export const StatusList = [
    {
        icon:           <IconDatabasePlus/>,
        label:          "new",
        status:         BulkItemStatus.NEW,
        Empty:          () => <WithTranslationProvider
            withTranslation={{
                namespace: "common.bulk",
            }}
        >
            <Status
                title={"status.new.title"}
                message={"status.new.subtitle"}
            />
        </WithTranslationProvider>,
        withJobControl: false,
    },
    {
        icon:           <IconFileImport/>,
        label:          "pending",
        status:         BulkItemStatus.PENDING,
        Empty:          () => <WithTranslationProvider
            withTranslation={{
                namespace: "common.bulk",
            }}
        >
            <Status
                title={"status.pending.title"}
                message={"status.pending.subtitle"}
            />
        </WithTranslationProvider>,
        withJobControl: true,
    },
    {
        icon:           <IconTrophy/>,
        label:          "success",
        status:         BulkItemStatus.SUCCESS,
        Empty:          () => <WithTranslationProvider
            withTranslation={{
                namespace: "common.bulk",
            }}
        >
            <Status
                title={"status.success.title"}
                message={"status.success.subtitle"}
            />
        </WithTranslationProvider>,
        withJobControl: false,
    },
    {
        icon:           <IconAlertTriangle/>,
        label:          "error",
        status:         BulkItemStatus.ERROR,
        Empty:          () => <WithTranslationProvider
            withTranslation={{
                namespace: "common.bulk",
            }}
        >
            <Status
                title={"status.error.title"}
                message={"status.error.subtitle"}
            />
        </WithTranslationProvider>,
        withJobControl: false,
    },
    {
        icon:           <IconCheckbox/>,
        label:          "settled",
        status:         BulkItemStatus.SETTLED,
        Empty:          () => <WithTranslationProvider
            withTranslation={{
                namespace: "common.bulk",
            }}
        >
            <Status
                title={"status.settled.title"}
                message={"status.settled.subtitle"}
            />
        </WithTranslationProvider>,
        withJobControl: false,
    },
] as const;
