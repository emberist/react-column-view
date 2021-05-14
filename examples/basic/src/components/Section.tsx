import React, { FC, HTMLAttributes } from "react";
import Button from "./Button";

const Section: FC<Pick<HTMLAttributes<HTMLButtonElement>, "onClick"> & { title: string }> = ({
    children,
    title,
    onClick
}) => {
    return (
        <div className="min-w-[250px] sm:w-52">
            <div className={"p-2 bg-gray-100 items-center flex justify-between border-b-2"}>
                <div className={"font-medium"}>{title}</div>

                <Button onClick={onClick}>Add</Button>
            </div>
            <div className={"overflow-auto divide-y-2"}>{children}</div>
        </div>
    );
};

export default Section;
