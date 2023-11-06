import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

export const CountrySelect = ({
    name = "",
    label = "",
    handleChange = () => {}
}) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://restcountries.com/v3.1/all"
                );
                const countryData = response.data.map((country) => ({
                    label: country.name.common,
                    value: country.cca2,
                    flag: country.flags.png
                }));
                setCountries(countryData);

                const ipResponse = await fetch(
                    "https://api.ipify.org?format=json"
                );
                const ipData = await ipResponse.json();
                const locationResponse = await fetch(
                    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_GEO_KEY}&ip=${ipData.ip}`
                );
                const locationData = await locationResponse.json();

                for (const country of countryData) {
                    if (country.label === locationData.country_capital) {
                        if (handleChange) handleChange(country.label);
                        setSelectedCountry(country);
                        break;
                    }
                }
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };

        fetchData();
    }, []);

    const handleCountryChange = (selectedOption) => {
        handleChange(selectedOption.label);
        setSelectedCountry(selectedOption);
    };

    const formatOptionLabel = ({ value, label, flag }) => (
        <div className="flex items-center space-x-3 text-white">
            <img src={flag} alt={label} className="w-5 h-auto" />
            <span>{label}</span>
        </div>
    );

    return (
        <div className="w-full">
            <label htmlFor={name} className="mb-1 text-white text-title">
                {label}
            </label>
            <Select
                className="text-white text-content w-full"
                styles={customStyles}
                placeholder="Select Country"
                value={selectedCountry}
                options={countries}
                name={name}
                onChange={handleCountryChange}
                formatOptionLabel={formatOptionLabel}
                isSearchable
            />
        </div>
    );
};
