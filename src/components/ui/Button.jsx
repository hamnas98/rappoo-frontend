import React from 'react';

const Button = ({
  text = "Button",
  text_font_size = "16px",
  text_font_family = "Manrope",
  text_font_weight = "600",
  text_line_height = "22px",
  text_text_align = "center",
  text_color = "#000000",
  fill_background_color = "#ffffff",
  border_border = "1px solid rgba(0, 0, 0, 0.07)",
  border_border_radius = "26px",
  padding = "12px 30px",
  layout_width,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  children,
  ...props
}) => {
  const buttonStyles = {
    fontSize: text_font_size,
    fontFamily: text_font_family,
    fontWeight: text_font_weight,
    lineHeight: text_line_height,
    textAlign: text_text_align,
    color: text_color,
    backgroundColor: fill_background_color,
    border: border_border,
    borderRadius: border_border_radius,
    padding: padding,
    width: layout_width === "full" ? "100%" : layout_width,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={buttonStyles}
      className={`inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default Button;