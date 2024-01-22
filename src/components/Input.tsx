import React from 'react';

interface InputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    name?: string;
}

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type = 'text',
    onChange,
    disabled,
    label,
    name
}) => {
    return (
        <div className="w-full">
            {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
            <input
                name={name}
                disabled={disabled}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                type={type}
                className="
          w-full
          p-4 
          text-lg 
          bg-[#F6F6F6] 
          border-2
          rounded-md
          outline-none
          text-black
          focus:border-blue-600
          focus:border-2
          transition
        "
            />
        </div>
    );
};

export default Input;