import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

export const WindowSelect = ({
    name = "",
    label = "",
    className = "",
    value = "",
    disabled = false,
    handleChange = () => {}
}) => {
    const [countries, setCountries] = useState([]);
    const [selectedWindow, setSelectedWindow] = useState(null);

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

    const options = [
        {
            label: "Single pane",
            value: 0.21
        },
        {
            label: "Double pane, air filled",
            value: 0.36
        },
        {
            label: "Double pane, low-E",
            value: 0.48
        },
        {
            label: "Double pane, low-E, Argon filled",
            value: 0.53
        }
    ];

    useEffect(() => {
        for (const option of options) {
            if (option.label === value) {
                setSelectedWindow(option);
                break;
            }
        }
    }, []);

    const handleWindowChange = (selectedOption) => {
        handleChange(selectedOption);
        setSelectedWindow(selectedOption);
    };

    const formatOptionLabel = ({ value, label }) => {
        if (selectedWindow && selectedWindow.label === label) {
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
                placeholder="Select Window"
                value={selectedWindow}
                options={options}
                name={name}
                isDisabled={disabled}
                onChange={handleWindowChange}
                formatOptionLabel={formatOptionLabel}
                isSearchable
            />
        </div>
    );
};
