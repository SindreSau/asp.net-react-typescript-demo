import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isOutline?: boolean;
    isBlock?: boolean;
    isLoading?: boolean;
}

/**
 * **Button** is a reusable component that renders a styled button element.
 *
 * @param variant - The color variant of the button. Defaults to 'primary'.
 * @param size - The size of the button. Defaults to 'md'.
 * @param isOutline - Whether the button should be an outline button. Defaults to false.
 * @param isBlock - Whether the button should take up the full width of its parent. Defaults to false.
 * @param isLoading - Whether the button is in a loading state. Defaults to false.
 * @param className - Additional classes to apply to the button.
 * @param children - The content to render inside the button.
 * @param disabled - Whether the button is disabled. Defaults to false.
 * @param props - Additional props to pass to the button element.
 */
export const Button: React.FC<ButtonProps> = ({
                                                  variant = 'primary',
                                                  size = 'md',
                                                  isOutline = false,
                                                  isBlock = false,
                                                  isLoading = false,
                                                  className = '',
                                                  children,
                                                  disabled,
                                                  ...props
                                              }) => {
    const baseClass = isOutline ? 'btn-outline' : 'btn';
    const classes = [
        'btn',
        `${baseClass}-${variant}`,
        `btn-${size}`,
        isBlock ? 'w-100' : '',
        isLoading ? 'disabled' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classes}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
            )}
            {children}
        </button>
    );
};