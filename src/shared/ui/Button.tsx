import Link from 'next/link';
import { PropsWithChildren } from 'react';

type ButtonProps = {
  color?: 'red' | 'blue';
  className?: string;
  href?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  color = 'red',
  type = 'button',
  className,
  href,
  onClick,
  disabled = false,
  children,
}) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`max-w-[335px] w-full h-[60px] rounded-[10px] text-white font-[600] flex justify-center items-center ${
          color === 'red' ? 'bg-red hover:bg-[#9F2E26]' : 'bg-blue hover:bg-[#072549]'
        } ${className} transition-colors duration-300`}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`max-w-[335px] w-full h-[60px] rounded-[10px] font-[600] text-white ${className} transition-colors ${
        color === 'red' ? 'bg-red hover:bg-[#9F2E26]' : 'bg-blue hover:bg-[#072549]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {children}
    </button>
  );
};
