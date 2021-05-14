import React, { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
    return (
        <button {...props} className={classNames(className, "btn")}>
            {children}
        </button>
    );
};

export default Button;
