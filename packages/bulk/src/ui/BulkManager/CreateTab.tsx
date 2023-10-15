import {type WithMutation}      from "@use-pico/query";
import {Container}              from "@use-pico/ui";
import {type FC}                from "react";
import {BulkItemStatus}         from "../../api/BulkItemStatus";
import {BulkItemMutationSchema} from "../../schema/BulkItemMutationSchema";
import {BulkItemSchema}         from "../../schema/BulkItemSchema";
import {BulkManager}            from "../BulkManager";

export namespace CreateTab {
    export interface Props {
        bulkId: string;
        service: string;
        withBulkItemMutation: WithMutation<BulkItemMutationSchema, BulkItemSchema>;
        WithCreate: BulkManager.WithCreate;
    }
}

export const CreateTab: FC<CreateTab.Props> = (
    {
        bulkId,
        service,
        withBulkItemMutation,
        WithCreate,
    }
) => {
    const bulkItemMutation = withBulkItemMutation.useMutation();
    return <Container>
        <WithCreate
            bulkId={bulkId}
            service={service}
            withMutationOverride={({form}) => ({
                mutator:  async values => {
                    return bulkItemMutation.mutateAsync({
                        create: {
                            bulkId,
                            service,
                            status:  BulkItemStatus.PENDING,
                            values:  form.getValues(),
                            request: values,
                        },
                    });
                },
                response: BulkItemSchema,
            })}
        />
    </Container>;
};
