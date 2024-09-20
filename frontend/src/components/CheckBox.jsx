import React from 'react';

export const Checkbox = ({
  label,
  options, // Expecting options to be an array of objects
  selectedOptions,
  onChange,
}) => {
  const handleChange = (event) => {
    const { value, checked } = event.target;
    let updatedOptions = [...selectedOptions];

    if (checked) {
      updatedOptions.push(value); // Add the value if checked
    } else {
      updatedOptions = updatedOptions.filter((option) => option !== value); // Remove if unchecked
    }

    onChange(updatedOptions); // Update selected options
  };

  return (
    <div>
      <label className="p-2 font-medium">{label}</label>
      <div>
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <div key={optionValue} className="flex px-2 items-center">
            <input
              type="checkbox"
              value={optionValue}
              checked={selectedOptions.includes(optionValue)} // Check if option is selected
              onChange={handleChange}
              className="mr-2"
            />
            <span>{optionLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
