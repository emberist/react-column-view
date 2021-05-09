import classNames from "classnames";
import React, { FC, HTMLAttributes } from "react";
import { useColumnView } from "react-column-view";

type Item = {
    id?: string;
    name: string;
};

const Section: FC<Pick<HTMLAttributes<HTMLButtonElement>, "onClick"> & { title: string }> = ({
    children,
    title,
    onClick,
}) => {
    return (
        <div className="min-w-[250px] sm:w-52 border-2 rounded">
            <div className={"p-2 bg-gray-100  items-center flex justify-between border-b-2"}>
                <div className={""}>{title}</div>
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

function App() {
    const { insert, root, path, getChildren, push, data } = useColumnView<Item>();
    return (
        <div className={"md:container mx-auto my-2"}>
            <div className={"flex overflow-auto gap-x-1"}>
                <Section
                    title={"Section 1"}
                    onClick={() => {
                        insert({ name: "Ciao" });
                    }}
                >
                    {root?.map((item, index) => (
                        <div
                            className={classNames("p-2 hover:bg-gray-100", {
                                "bg-gray-200": path.includes(item),
                            })}
                            onClick={() => {
                                push(item, 0);
                            }}
                        >
                            {data?.[item].data.name} {index}
                        </div>
                    ))}
                </Section>

                {path?.map((item, sectionIndex) => (
                    <Section
                        title={"Section " + (sectionIndex + 2)}
                        onClick={() => {
                            insert({ name: "Child " + (sectionIndex + 1) }, path[sectionIndex]);
                        }}
                    >
                        {getChildren(item)?.map((child, index) => {
                            return (
                                <div
                                    className={classNames("p-2 hover:bg-gray-100", {
                                        "bg-gray-200": path.includes(child.id),
                                    })}
                                    onClick={() => push(child.id, sectionIndex + 1)}
                                >
                                    {data?.[child.id]?.data?.name}.{index}
                                </div>
                            );
                        })}
                    </Section>
                ))}
            </div>

            <div className={"text-xs"}>
                <pre>{JSON.stringify({ path, root, data }, null, 2)}</pre>
            </div>
        </div>
    );
}

export default App;
