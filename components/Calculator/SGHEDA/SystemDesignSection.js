import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";
import { useFormikContext } from "formik";

export const SystemDesignSection = ({ footer }) => {
    // use useFormikContext to gain access to Formik state and helper methods
    const { getFieldProps, touched, errors } = useFormikContext();

    return (
        <div className="w-full h-full grid md:grid-cols-1 lg:grid-cols-2 gap-8 my-8">
            <div className="flex sm:flex-row flex-col gap-4">
                <Input
                    type="number"
                    label="Heat Load"
                    placeholder="64000"
                    badge="W"
                    {...getFieldProps("system.heatLoad")}
                    error={touched.system?.heatLoad && errors.system?.heatLoad}
                    errorText={errors.system?.heatLoad}
                />
                <Input
                    type="number"
                    label="Input Fluid Temperature"
                    badge="°C"
                    placeholder="54"
                    {...getFieldProps("system.inputFluidTemperature")}
                    error={
                        touched.system?.inputFluidTemperature &&
                        errors.system?.inputFluidTemperature
                    }
                    errorText={errors.system?.inputFluidTemperature}
                />
            </div>
            <div className="flex flex-col">
                <label className="mb-1 text-white text-title">Ring Type</label>
                <RadioButtonGroup
                    options={[
                        {
                            value: 0,
                            label: "Horizontal Slinky"
                        },
                        { value: 1, label: "Vertical Slinky" },
                        { value: 2, label: "Earth Basket" }
                    ]}
                    // Here you set the error text if there's an error related to this field
                    // and this field was touched.
                    {...getFieldProps("system.type")}
                    error={touched.system?.type && errors.system?.type}
                />
            </div>
            {footer("md:col-span-1 lg:col-span-2")}
        </div>
    );
};
