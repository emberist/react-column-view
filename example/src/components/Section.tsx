import React, { FC, HTMLAttributes } from "react";

const Section: FC<Pick<HTMLAttributes<HTMLButtonElement>, "onClick"> & { title: string }> = ({
    children,
    title,
    onClick,
}) => {
    return (
        <div className="min-w-[250px] sm:w-52 border-r-2">
            <div className={"p-2 bg-gray-100 items-center flex justify-between border-b-2"}>
                <div className={"font-medium"}>{title}</div>
                <button
                    className={
                        "px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    }
                    onClick={onClick}
                >
                    Add
                </button>
            </div>
            <div className={"overflow-auto divide-y-2"}>{children}</div>
        </div>
    );
};

export default Section;
