import React, { ButtonHTMLAttributes } from 'react';

// --- STRICT TYPESCRIPT INTERFACES ---
// This tells Vercel exactly what props are allowed and required
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  ...props 
}: ButtonProps) => {
  
  // Core structural styling
  const baseStyle = "px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Variant theme mapping
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 shadow-sm",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border-2 border-gray-200 text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;