import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";
import { useFormikContext } from "formik";

export const TempSection = ({ footer }) => {
    // use useFormikContext to gain access to Formik state and helper methods
    const { getFieldProps, values, touched, errors } = useFormikContext();

    return (
        <div className="w-full h-full gap-8 my-8">
            <div className="flex sm:flex-row flex-col gap-4">
                <Input
                    type="number"
                    label="Inner Temperature"
                    placeholder="64000"
                    autoFocus
                    badge="°C"
                    {...getFieldProps("temp.innerTemp")}
                    error={touched.temp?.innerTemp && errors.temp?.innerTemp}
                    errorText={errors.temp?.innerTemp}
                />
                <Input
                    type="number"
                    label="Outer Temperature"
                    badge="°C"
                    placeholder="54"
                    {...getFieldProps("temp.outerTemp")}
                    error={touched.temp?.outerTemp && errors.temp?.outerTemp}
                    errorText={errors.temp?.outerTemp}
                />
            </div>
            {footer("md:col-span-1 lg:col-span-2")}
        </div>
    );
};
