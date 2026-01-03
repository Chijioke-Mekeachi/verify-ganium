import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  icon?: LucideIcon;
  gradient?: string[];
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon: Icon,
  className = '',
  gradient,
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2';
  
  if (variant === 'outline') {
    return (
      <button
        className={`${baseClasses} border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary-dark dark:hover:text-primary-dark ${className}`}
        {...props}
      >
        {Icon && <Icon size={18} />}
        {children}
      </button>
    );
  }
  
  if (gradient) {
    return (
      <button
        className={`${baseClasses} text-white relative overflow-hidden group ${className}`}
        style={{
          background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        }}
        {...props}
      >
        <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
        {Icon && <Icon size={18} />}
        <span className="relative">{children}</span>
      </button>
    );
  }
  
  return (
    <button
      className={`${baseClasses} gradient-bg text-white hover:opacity-90 ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default PrimaryButton;