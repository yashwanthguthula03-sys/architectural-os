// src/components/ui/Button.tsx
export const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseStyle = "px-6 py-3 rounded-xl text-sm transition-all";
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "bg-white border border-gray-200 text-gray-900 hover:border-gray-900"
  };
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
};