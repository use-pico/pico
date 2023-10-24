import {
    CalendarProvider,
    Years
}                          from "@use-pico/calendar";
import {useDisclosure}     from "@use-pico/hook";
import {
    DateInline,
    DateTime
}                          from "@use-pico/i18n";
import {isPartial}         from "@use-pico/schema";
import {NativeModal}       from "@use-pico/ui";
import {useController}     from "react-hook-form";
import type {ValuesSchema} from "../schema/ValuesSchema";
import {type Form}         from "../ui/Form";
import {Description}       from "./Description";
import {InputEx}           from "./InputEx";
import {Label}             from "./Label";

export namespace YearInput {
    export interface Props<
        TValuesSchema extends ValuesSchema,
    > extends Form.Input.Props<TValuesSchema> {
        onYear?(props?: OnChangeProps): void;
    }

    export interface OnChangeProps {
        date: DateTime;
        iso: string;
    }
}

export const YearInput = <
    TValuesSchema extends ValuesSchema,
>(
    {
        withControl,
        schema,
        onYear,
        ...props
    }: YearInput.Props<TValuesSchema>
) => {
    const [opened, {
        open,
        close
    }] = useDisclosure(false);
    const {
        field: {
                   value,
                   onChange,
               },
    } = useController(withControl);

    return <>
        <NativeModal
            opened={opened}
            onClose={close}
            size={"50%"}
            title={<>
                <Label
                    label={`${withControl.name}.label`}
                    withAsterisk={!isPartial(schema, withControl.name)}
                />
                <Description description={`${withControl.name}.description`}/>
            </>}
        >
            <CalendarProvider
                selected={value ? DateTime.fromISO(value) : undefined}
            >
                <Years
                    onClick={({year}) => {
                        onChange(year.year.toISODate());
                        onYear?.({
                            date: year.year,
                            iso:  String(year.year.toISODate()),
                        });
                        close();
                    }}
                />
            </CalendarProvider>
        </NativeModal>
        <InputEx
            withControl={withControl}
            schema={schema}
            onClick={open}
            {...props}
        >
            {value ? <DateInline
                date={value}
                options={{
                    year: "numeric"
                }}
            /> : null}
        </InputEx>
    </>;
};
