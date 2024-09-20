import React, { useState } from "react";

export const RadioButton = ({value, options, name, label }) => {
  const [selectedValue, setSelectedValue] = useState(options[0]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="pt-4">
      <label className="p-2 font-medium">{label}</label>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            value={value ? value : option}
            name={name}
            checked={selectedValue === option}
            onChange={handleChange}
            className="m-4"
            required
          />
          {option}
        </label>
      ))}
    </div>
  );
};
