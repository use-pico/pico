import {
    type IDateRange,
    rangeOf,
    RangeOfList,
    Translation
}                          from "@use-pico/i18n";
import {
    SegmentedControl,
    Stack
}                          from "@use-pico/ui";
import {useController}     from "react-hook-form";
import type {ValuesSchema} from "../schema/ValuesSchema";
import type {Form}         from "../ui/Form";
import {Description}       from "./Description";
import {Error}             from "./Error";
import {Label}             from "./Label";

export namespace RangeOfInput {
    export interface Props<
        TValuesSchema extends ValuesSchema,
    > extends Form.Input.PropsEx<TValuesSchema, Omit<SegmentedControl.Props, "data">> {
        onRange?(props: OnRangeProps): void;
    }

    export interface OnRangeProps {
        range?: IDateRange;
    }
}

export const RangeOfInput = <
    TValuesSchema extends ValuesSchema,
>(
    {
        withControl,
        schema,
        onChange: $onChange,
        onRange,
        ...props
    }: RangeOfInput.Props<TValuesSchema>
) => {
    const {
        field: {
                   onChange,
                   ...field
               },
        fieldState,
    } = useController(withControl);
    const shape = (schema as any)?.shape[withControl.name];

    return <>
        <Stack gap={1}>
            <Label
                withAsterisk={shape && !shape.isOptional()}
                label={`${withControl.name}.label`}
            />
            <Description description={`${withControl.name}.description`}/>
        </Stack>
        <Stack
            gap={0}
        >
            <SegmentedControl
                fullWidth
                onChange={item => {
                    onChange(item);
                    $onChange?.(item);
                    onRange?.({
                        range: rangeOf({range: item}),
                    });
                }}
                data={RangeOfList.map(label => ({
                    label: <Translation namespace={"common"} label={"range-of"} withLabel={label}/>,
                    value: label
                }))}
                {...field}
                {...props}
            />
            <Error error={fieldState.error?.message}/>
        </Stack>
    </>;
};
