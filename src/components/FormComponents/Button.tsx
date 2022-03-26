import React, { FC } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  children: string | number;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  outline?: boolean;
  loading?: boolean;
  size?: "lg" | "md" | "sm" | "xs";
  disabled?: boolean;
  wrap?: boolean;
  wide?: boolean;
  disableOnLoading?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "secondary",
  loading = false,
  disabled = false,
  size = "md",
  wrap = true,
  wide = false,
  disableOnLoading = true,
  outline = false,
  type = "button",
  onClick = () => {},
}) => {
  let className = `rounded-full btn btn-${variant} btn-${size} ${
    loading && "loading"
  }
  ${outline && "btn-outline"}
  ${wide && "btn-wide"}
  ${(disabled || (disableOnLoading && loading)) && "btn-disabled"}`;
  const button = (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
  if (wrap) return <div>{button}</div>;
  return button;
};
