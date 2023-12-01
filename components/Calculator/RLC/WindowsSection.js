import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";
import { useFormikContext } from "formik";
import { WindowSelect } from "@components/WindowSelect";

export const WindowsSection = ({ footer }) => {
    // use useFormikContext to gain access to Formik state and helper methods
    const { getFieldProps, setFieldValue, values, touched, errors } =
        useFormikContext();

    return (
        <div className="w-full h-full gap-8 my-8">
            <div className="flex sm:flex-row flex-col gap-4">
                <WindowSelect
                    label="Window"
                    name="material"
                    className="w-full my-1 col-span-2 sm:col-span-1"
                    handleChange={(e) => {
                        setFieldValue(`windows.rValue`, e.value);
                        setFieldValue(`windows.window`, e.label);
                    }}
                />
                <Input
                    type="number"
                    label="R-value"
                    readOnly
                    placeholder="64000"
                    autoFocus
                    badge={
                        <>
                            m<sup>2</sup>*K/W
                        </>
                    }
                    {...getFieldProps("windows.rValue")}
                    error={touched.windows?.rValue && errors.windows?.rValue}
                    errorText={errors.windows?.rValue}
                />
                <Input
                    type="number"
                    label="Area"
                    badge={
                        <>
                            m<sup>2</sup>
                        </>
                    }
                    placeholder="54"
                    {...getFieldProps("windows.area")}
                    error={touched.windows?.area && errors.windows?.area}
                    errorText={errors.windows?.area}
                />
            </div>
            {footer("md:col-span-1 lg:col-span-2")}
        </div>
    );
};
