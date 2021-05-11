import Section from "./Section";
import React from "react";
import classNames from "classnames";
import { useColumnView } from "react-column-view";

type ColumnViewItem = {
    id?: string;
    name: string;
};

const ColumnView = () => {
    const {
        insert,
        root,
        path,
        getChildren,
        getItems,
        push,
        getItem,
    } = useColumnView<ColumnViewItem>();
    return (
        <div
            className={
                "border-2 border-gray-400 rounded overflow-auto min-h-[400px] flex flex-col bg-white"
            }
        >
            <div className={"flex flex-grow overflow-auto"}>
                <Section title={"Section 1"} onClick={() => insert({ name: "Child" })}>
                    {root?.map((item: string, index: number) => (
                        <div
                            key={index}
                            className={classNames("p-2 hover:bg-gray-100", {
                                "bg-gray-200": path.includes(item),
                            })}
                            onClick={() => {
                                push(item, 0);
                            }}
                        >
                            {getItem(item)?.name} {index}
                        </div>
                    ))}
                </Section>

                {path?.map((item: string, sectionIndex: number) => (
                    <Section
                        key={sectionIndex}
                        title={"Section " + (sectionIndex + 2)}
                        onClick={() => {
                            insert({ name: "Child " + (sectionIndex + 1) }, path[sectionIndex]);
                        }}
                    >
                        {getChildren(item)?.map((child: ColumnViewItem, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className={classNames("p-2 hover:bg-gray-100", {
                                        "bg-gray-200": path.includes(child.id),
                                    })}
                                    onClick={() => push(child.id, sectionIndex + 1)}
                                >
                                    {child.name}.{index}
                                </div>
                            );
                        })}
                    </Section>
                ))}
            </div>
            <div className={"flex border-t-2"}>
                {getItems(path).map((item: ColumnViewItem, index: number) => (
                    <>
                        <div className={"px-5 py-2"}>{item?.name}</div>
                        {index < path.length - 1 && <div className={"font-bold px-5 py-2"}>/</div>}
                    </>
                ))}
            </div>
        </div>
    );
};

export default ColumnView;
