export const Button = ({ label, onClick, color }) => {
  return (
    <button onClick={onClick} className={`${color} rounded-lg w-full p-4 mt-5 font-medium text-white`}>
      {label}
    </button>
  );
};
