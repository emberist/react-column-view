import React, { Fragment } from "react";
import Section from "./Section";
import classNames from "classnames";
import { useColumnView, WrappedItem } from "react-column-view";

type ColumnViewItem = {
    id?: string;
    name: string;
};

const ColumnView = () => {
    const { insert, root, path } = useColumnView<ColumnViewItem>();

    return (
        <div
            className={
                "border-2 border-gray-400 rounded-md overflow-auto min-h-[400px] flex flex-col bg-white"
            }
        >
            <div className={"flex flex-grow overflow-auto divide-x-2"}>
                <Section title={"Section 1"} onClick={() => insert({ name: "Child" })}>
                    {root?.map((item: WrappedItem<ColumnViewItem>, index: number) => (
                        <div
                            {...item.buildProps()}
                            onClick={() => item.pushAt(0)}
                            className={classNames("p-2 hover:bg-gray-100", {
                                "bg-gray-200": item.isSelected
                            })}
                        >
                            {item?.data()?.name} {index}
                        </div>
                    ))}
                </Section>

                {path?.map((item: any, sectionIndex: number, original: string[]) => (
                    <Section
                        key={sectionIndex}
                        title={"Section " + (sectionIndex + 2)}
                        onClick={() => {
                            insert({ name: "Child " + (sectionIndex + 1) }, original[sectionIndex]);
                        }}
                    >
                        {item
                            .children()
                            ?.map((child: WrappedItem<ColumnViewItem>, index: number) => {
                                return (
                                    <div
                                        {...child.buildProps()}
                                        onClick={() => child.pushAt(sectionIndex + 1)}
                                        className={classNames("p-2 hover:bg-gray-100", {
                                            "bg-gray-200": child.isSelected
                                        })}
                                    >
                                        {child.data()?.name}.{index}
                                    </div>
                                );
                            })}
                    </Section>
                ))}
            </div>
            <div className={"flex border-t-2"}>
                {path.map((item: WrappedItem<ColumnViewItem>, index: number) => (
                    <Fragment {...item.buildProps()}>
                        <div className={"px-5 py-2"}>{item?.data()?.name}</div>
                        {index < path.length - 1 && <div className={"font-bold px-5 py-2"}>/</div>}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default ColumnView;
