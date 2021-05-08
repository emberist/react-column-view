import classNames from "classnames";
import React from "react";
import { useColumnView } from "react-column-view";

type Item = {
    id: string;
    name: string;
};

function App() {
    const { insert, root, path, push, data } = useColumnView<Item>();
    const getItemChildren = () => [];
    return (
        <div className={"md:container mx-auto"}>
            <div className={"grid grid-cols-6 gap-x-2 my-2"}>
                <button
                    className={"border-2"}
                    onClick={() =>
                        insert({
                            id: Math.random() + "",
                            name: "Ciao",
                        })
                    }
                >
                    Add root item
                </button>

                <button
                    className={"border-2"}
                    onClick={() =>
                        insert(
                            {
                                id: Math.random() + "",
                                name: "Ciao",
                            },
                            path[path.length - 1]
                        )
                    }
                >
                    Add item to {path[path.length - 1]}
                </button>
            </div>

            <div className={"grid grid-cols-3 gap-x-1"}>
                <div className={"border-2 rounded divide-y-2"}>
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
                </div>

                {path?.map((item, index) => (
                    <div className="border-2 rounded divide-y-2" style={{ maxWidth: 250 }}>
                        {getItemChildren().map((child) => (
                            <div
                                className={classNames("p-2 hover:bg-gray-100", {
                                    "bg-gray-200": path.includes(item),
                                })}
                                onClick={() => {
                                    push(item, index + 1);
                                }}
                            >
                                {data?.[child].data.name} {index}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <pre>{JSON.stringify({ path, root, data }, null, 2)}</pre>
        </div>
    );
}

export default App;
