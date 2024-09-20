import React, { useState } from "react";

export const Dropdown = ({value, options, label }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="pt-2">
      <label className="p-2 font-medium">{label}</label>
      {/* Adding margin-bottom to create space between label and select box */}
      <select
        value={value ? value : selectedOption}
        className="h-12 w-full border-2 p-3 rounded-md mt-2"
        onChange={handleChange}
        required
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
