import { Input } from "@components/Input";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";
import { Select } from "@components/Select";
import { useFormikContext } from "formik";

export const SystemDesignSection = ({ footer }) => {
    // use useFormikContext to gain access to Formik state and helper methods
    const { setFieldValue, getFieldProps, values, touched, errors } =
        useFormikContext();

    return (
        <div className="w-full h-full flex flex-col gap-8 my-8">
            <div className="flex gap-4 flex-col sm:flex-row sm:items-center">
                <label className="mb-1 text-white text-title">Loop Type</label>
                <RadioButtonGroup
                    options={[
                        { value: 0, label: "Open Loop" },
                        { value: 1, label: "Closed Loop" }
                    ]}
                    selectedValue={values.loopType}
                    setValue={(value) => {
                        setFieldValue("loopType", value);
                    }}
                    error={touched.loopType && errors.loopType}
                />
            </div>
            <div
                className={`grid ${
                    values.loopType === 0
                        ? "lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
                        : "lg:grid-cols-4 md:grid-cols-2 grid-cols-1"
                } gap-4`}
            >
                <Input
                    type="number"
                    label="Heat Load"
                    placeholder="300"
                    autoFocus
                    badge="W"
                    step={0.01}
                    {...getFieldProps("heatLoad")}
                    error={touched.heatLoad && errors.heatLoad}
                    errorText={errors.heatLoad}
                />
                <Input
                    type="number"
                    label="Ground Temp"
                    badge="°C"
                    step={0.01}
                    placeholder="15"
                    {...getFieldProps("groundTemp")}
                    error={touched.groundTemp && errors.groundTemp}
                    errorText={errors.groundTemp}
                />
                <Input
                    type="number"
                    label="Room Temp"
                    badge="°C"
                    step={0.01}
                    placeholder="25"
                    {...getFieldProps("roomTemp")}
                    error={touched.roomTemp && errors.roomTemp}
                    errorText={errors.roomTemp}
                />
                {values.loopType === 0 && (
                    <Input
                        type="number"
                        label="Outside Temp"
                        badge="°C"
                        step={0.01}
                        placeholder="38"
                        {...getFieldProps("outsideTemp")}
                        error={touched.outsideTemp && errors.outsideTemp}
                        errorText={errors.outsideTemp}
                    />
                )}
                <Input
                    type="number"
                    label="Pipe Inner Diameter"
                    badge="m"
                    step={0.01}
                    placeholder="0.21"
                    {...getFieldProps("pipeInnerDiameter")}
                    error={
                        touched.pipeInnerDiameter && errors.pipeInnerDiameter
                    }
                    errorText={errors.pipeInnerDiameter}
                />
                <Input
                    type="number"
                    label="Pipe Outer Diameter"
                    badge="m"
                    step={0.01}
                    placeholder="0.26"
                    {...getFieldProps("pipeOuterDiameter")}
                    error={
                        touched.pipeOuterDiameter && errors.pipeOuterDiameter
                    }
                    errorText={errors.pipeOuterDiameter}
                />
                <Select
                    label="Pipe Material"
                    {...getFieldProps("pipeMaterial")}
                    options={[
                        { value: "Clay", label: "Clay" },
                        { value: "PEX", label: "PEX" },
                        { value: "Steel", label: "Steel" },
                        { value: "PVC", label: "PVC" }
                    ]}
                />
                <Input
                    type="number"
                    label="Buried Depth"
                    badge="m"
                    step={0.01}
                    placeholder="2.0"
                    {...getFieldProps("buriedDepth")}
                    error={touched.buriedDepth && errors.buriedDepth}
                    errorText={errors.buriedDepth}
                />
                <Input
                    type="number"
                    label="Fan Velocity"
                    badge="m/s"
                    step={0.01}
                    placeholder="1.5"
                    {...getFieldProps("fanVelocity")}
                    error={touched.fanVelocity && errors.fanVelocity}
                    errorText={errors.fanVelocity}
                />
            </div>
            {footer("md:col-span-1 lg:col-span-2")}
        </div>
    );
};
