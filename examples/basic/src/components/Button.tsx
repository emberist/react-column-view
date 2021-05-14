import React, { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
    return (
        <button
            {...props}
            className={classNames(
                className,
                "px-4 py-1 mr-2 text-sm text-purple-600 font-semibold rounded-full border disabled:opacity-50 border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            )}
        >
            {children}
        </button>
    );
};

export default Button;
