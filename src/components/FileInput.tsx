import React, { useState } from 'react';

type FileInputVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type FileInputSize = 'small' | 'medium' | 'large';

interface FileInputProps {
  id?: string;
  label?: string;
  multiple?: boolean;
  disabled?: boolean;
  accept?: string;
  variant?: FileInputVariant;
  size?: FileInputSize;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  style?: React.CSSProperties;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  multiple = false,
  disabled = false,
  accept,
  variant = 'primary',
  size = 'medium',
  onChange,
  className = '',
  style,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target; // 使用解構賦值來取得 `files` 屬性
    if (files) {
      const selectedFileName = multiple ? `${files.length} files selected` : files[0].name;
      setFileName(selectedFileName);

      // 調用父層傳入的 onChange 方法
      if (onChange) {
        onChange(event);
      }
    }
  };

  return (
    <div className={`flex flex-col ${className}`} style={style}>
      {label && (
        <label htmlFor={id} className={`mb-2 text-${variant}`}>
          {label}
        </label>
      )}
      <input
        id={id}
        type="file"
        multiple={multiple}
        disabled={disabled}
        accept={accept}
        onChange={handleChange}
        className={`file-input text-${variant} file:${size} file:mr-4 file:py-2 file:px-4 
        file:border-0 file:text-sm file:font-semibold file:bg-${variant}-100 file:text-${variant}-700 
        hover:file:bg-${variant}-200 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      />
      {fileName && (
        <p className="mt-2 text-sm text-gray-600">
          Selected File: <span className="font-medium">{fileName}</span>
        </p>
      )}
    </div>
  );
};

export default FileInput;
