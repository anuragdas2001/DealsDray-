export const InputBox = ({ value, label, placeholder, onChange, type ,readOnly}) => {
  return (
    <div className="w-full">
      <div className="p-2 font-medium">{label}</div>
      <input
        className="h-12 w-full border-2 p-3 rounded-md"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        readOnly={readOnly} // Add this line
      />
    </div>
  );
};