import React, { Fragment, useMemo, useState } from "react";
import Section from "./Section";
import classNames from "classnames";
import { useColumnView, WrappedItem } from "react-column-view";
import Button from "./Button";

type ColumnViewItem = {
    id?: number;
    name: string;
    parent?: number;
    children?: number[];
};

const ColumnView = () => {
    const [name, setName] = useState<string>();
    const [search, setSearch] = useState<string>();

    const initialValues: ColumnViewItem[] = useMemo(
        () => [
            {
                id: 1,
                name: "Photos",
                children: [2, 7]
            },
            {
                id: 2,
                parent: 1,
                name: "Holidays"
            },
            {
                id: 7,
                parent: 1,
                name: "High school"
            },
            {
                id: 10,
                name: "Work",
                children: [22]
            },
            {
                id: 22,
                parent: 10,
                name: "Documents"
            }
        ],
        []
    );
    const { insert, root, path, navigate } = useColumnView<ColumnViewItem>({
        initialValues
    });

    return (
        <div
            className={
                "border-2 border-gray-400 rounded-md overflow-auto min-w-[600px] max-w-[80%] h-[500px] flex flex-col bg-white"
            }
        >
            <div className={"flex p-2 "}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name || ""}
                    onChange={e => setName(e.target.value)}
                    className="input"
                />
                <Button
                    disabled={!name}
                    onClick={() => {
                        if (name) {
                            insert({
                                name: name || "Unknown"
                            });
                            setName(undefined);
                        }
                    }}
                >
                    Add in root
                </Button>
                <Button
                    disabled={!name}
                    onClick={() => {
                        if (name) {
                            insert(
                                {
                                    name: name || "Unknown"
                                },
                                path.original[path.length - 1]
                            );
                            setName(undefined);
                        }
                    }}
                >
                    Push to path
                </Button>
                <input
                    type="text"
                    placeholder="Search"
                    value={name || ""}
                    onChange={e => setName(e.target.value)}
                    className="input align-end"
                />
            </div>
            <div className={"flex flex-auto overflow-y-hidden border-t-2"}>
                <Section
                    title={"Section 1"}
                    onClick={() => insert({ name: "Child " + (root.length + 1) })}
                >
                    {root?.map((item: WrappedItem<ColumnViewItem>) => (
                        <div
                            {...item.buildProps()}
                            onClick={() => item.pushAt(0)}
                            className={classNames("p-2 hover:bg-gray-100", {
                                "bg-gray-200": item.isSelected
                            })}
                        >
                            {item?.name}
                        </div>
                    ))}
                </Section>

                {path?.map(
                    (
                        item: WrappedItem<ColumnViewItem>,
                        sectionIndex: number,
                        original: string[]
                    ) => (
                        <Section
                            key={sectionIndex}
                            title={"Section " + (sectionIndex + 2)}
                            onClick={() => {
                                insert(
                                    { name: "Child " + (item.children().length + 1) },
                                    original[sectionIndex]
                                );
                            }}
                        >
                            {item.children().map((child: WrappedItem<ColumnViewItem>) => {
                                return (
                                    <div
                                        {...child.buildProps()}
                                        onClick={() => child.pushAt(sectionIndex + 1)}
                                        className={classNames("p-2 hover:bg-gray-100", {
                                            "bg-gray-200": child.isSelected
                                        })}
                                    >
                                        {child?.name}
                                    </div>
                                );
                            })}
                        </Section>
                    )
                )}
            </div>
            <div className={"flex border-t-2"}>
                {path.map((item: WrappedItem<ColumnViewItem>, index: number) => (
                    <Fragment {...item.buildProps()}>
                        <div className={"px-5 py-2"}>{item?.name}</div>
                        {index < path.length - 1 && <div className={"font-bold px-5 py-2"}>/</div>}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default ColumnView;
