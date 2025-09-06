import React, { useState } from 'react';
import { isValidHex } from '../utils/contrastUtils';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ label, color, onChange, className = '' }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(color);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (isValidHex(value)) {
      setIsValid(true);
      onChange(value);
    } else {
      setIsValid(false);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsValid(true);
    onChange(value);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-10 h-10 rounded border border-gray-300 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            isValid ? 'border-gray-300' : 'border-red-300 bg-red-50'
          }`}
          placeholder="#000000"
          aria-label={`${label} hex value`}
        />
      </div>
      {!isValid && (
        <span className="text-sm text-red-600">Invalid hex color format</span>
      )}
    </div>
  );
}