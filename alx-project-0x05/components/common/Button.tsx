import React from 'react';

interface ButtonProps {
  buttonLabel: string;
  buttonBackgroundColor: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  buttonLabel, 
  buttonBackgroundColor, 
  onClick 
}) => {
  const colorClasses = {
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600'
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[buttonBackgroundColor as keyof typeof colorClasses] || 'bg-gray-500'} 
        text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200`}
    >
      {buttonLabel}
    </button>
  );
};

export default Button;
