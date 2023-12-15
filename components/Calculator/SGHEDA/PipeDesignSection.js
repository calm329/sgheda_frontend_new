import React, { useState } from "react";
import { Input } from "@components/Input";
import { useFormikContext } from "formik";

export const PipeDesignSection = ({ footer }) => {
    const { getFieldProps, touched, errors } = useFormikContext();

    return (
        <div className="w-full h-full grid grid-cols-1 gap-8 my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                    label="Outer Diameter"
                    type="number"
                    placeholder="0.026"
                    autoFocus
                    {...getFieldProps("pipe.outerDiameter")}
                    error={
                        touched.pipe?.outerDiameter &&
                        errors.pipe?.outerDiameter
                    }
                    errorText={errors.pipe?.outerDiameter}
                    badge="m"
                />
                <Input
                    label="Inner Diameter"
                    type="number"
                    placeholder="0.021"
                    {...getFieldProps("pipe.innerDiameter")}
                    error={
                        touched.pipe?.innerDiameter &&
                        errors.pipe?.innerDiameter
                    }
                    errorText={errors.pipe?.innerDiameter}
                    badge="m"
                />
                <Input
                    label="Pipe Conductivity"
                    type="number"
                    placeholder="0.14"
                    {...getFieldProps("pipe.pipeConductivity")}
                    error={
                        touched.pipe?.pipeConductivity &&
                        errors.pipe?.pipeConductivity
                    }
                    errorText={errors.pipe?.pipeConductivity}
                    badge="W/(m*K)"
                />
                <Input
                    label="Buried Depth"
                    type="number"
                    placeholder="2.0"
                    {...getFieldProps("pipe.buriedDepth")}
                    error={
                        touched.pipe?.buriedDepth && errors.pipe?.buriedDepth
                    }
                    errorText={errors.pipe?.buriedDepth}
                    badge="m"
                />
            </div>
            {footer("")}
        </div>
    );
};
