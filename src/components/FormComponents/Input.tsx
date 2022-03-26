import React, { FC } from "react";

interface InputProps {
  name: string;
  type?: "text" | "number" | "textarea";
  label?: string;
  placeholder?: string;
  hideLabel?: boolean;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  value?: string;
}

export const Input: FC<InputProps> = ({
  name,
  value = "",
  type = "text",
  label,
  placeholder,
  hideLabel = false,
  required = true,
  rows = 5,
  disabled = false,
  error = false,
  helperText = "",
  onChange = () => {},
  onBlur = () => {},
}) => {
  const NormalizedName = name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
  if (!label) label = NormalizedName;
  if (!placeholder) placeholder = NormalizedName;
  const inputType = type == "textarea" ? "textarea" : "input";
  const inputComponentProps = {
    name,
    value,
    onChange,
    onBlur,
    disabled,
    rows,
    required,
    type,
    placeholder,
    className: `${inputType} ${inputType}-bordered ${inputType}-primary border ${
      error && `${inputType}-error`
    }`,
  };
  return (
    <div className="form-control">
      {!hideLabel && label && (
        <label className="label">
          <span className="label-text text-gray-950">{label}</span>
        </label>
      )}
      {type == "textarea" ? (
        <textarea {...inputComponentProps} />
      ) : (
        <input {...inputComponentProps} />
      )}
      {helperText && (
        <label className="label">
          <span className={`label-text-alt ${error && "text-error"} `}>
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
};
