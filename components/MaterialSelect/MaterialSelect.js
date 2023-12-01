import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import materialData from "./material.json";

export const MaterialSelect = ({
    name = "",
    label = "",
    className = "",
    value = "",
    disabled = false,
    handleChange = () => {}
}) => {
    const [countries, setCountries] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const customStyles = {
        input: (base) => ({
            ...base,
            color: "white"
        }),
        menu: (base) => ({
            ...base,
            margin: 0,
            zIndex: 999
        }),
        menuList: (base) => ({
            ...base,
            padding: 0,
            zIndex: 999
        }),
        control: (base, state) => ({
            ...base,
            background: "#09112D",
            borderColor: "#17234F",
            color: "white",
            "&:hover": {
                borderColor: "#17234F"
            }
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected
                    ? "#09112D66"
                    : isFocused
                    ? "#09112D88"
                    : "#09112D",
                color: "white"
            };
        }
    };

    const options = materialData.map((item) => ({
        value: item.thermalConductivity,
        label: item.name
    }));

    useEffect(() => {
        for (const option of options) {
            if (option.label === value) {
                setSelectedMaterial(option);
                break;
            }
        }
    }, []);

    const handleMaterialChange = (selectedOption) => {
        handleChange(selectedOption);
        setSelectedMaterial(selectedOption);
    };

    const formatOptionLabel = ({ value, label }) => {
        if (selectedMaterial && selectedMaterial.label === label) {
            // if this is the selected option, only show label
            return <div className="text-white">{label}</div>;
        }
        // else show both label and value
        return (
            <div className="flex items-center justify-between space-x-3 text-white">
                <span>{label}</span>
                <span className="text-content rounded-lg bg-gray-400 px-2 py-1">
                    {value}
                </span>
            </div>
        );
    };

    return (
        <div className={className}>
            <label htmlFor={name} className="mb-1 text-white text-title">
                {label}
            </label>
            <Select
                className="text-white text-content w-full"
                styles={customStyles}
                placeholder="Select Material"
                value={selectedMaterial}
                options={options}
                name={name}
                isDisabled={disabled}
                onChange={handleMaterialChange}
                formatOptionLabel={formatOptionLabel}
                isSearchable
            />
        </div>
    );
};
