import React from "react";

// ✅ React.FC means Function Component
// ✅ We pass `React.ButtonHTMLAttributes<HTMLButtonElement>` so our Button
//    automatically accepts all normal <button> props (onClick, disabled, style, etc.)
// ✅ React.FC also adds `children?: ReactNode` by default
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> & {
  // ✅ Here we extend the type by adding our own optional `title` prop
  title?: string;
} = ({ children, title, ...rest }) => {
  return (
    // ✅ `{...rest}` spreads all valid button attributes (className, style, onClick, etc.)
    <button {...rest}>
      {/* ✅ Prefer `title` if passed, otherwise render children */}
      {title ?? children}
    </button>
  );
};

export default Button;
