import React from "react";
import { useColumnView } from "react-column-view";

type Item = {
    id: string;
    name: string;
};

function App() {
    const { insert, root, path, data } = useColumnView<Item>();

    return (
        <div>
            <button
                onClick={() =>
                    insert({
                        id: Math.random() + "",
                        name: "Ciao",
                    })
                }
            >
                Add root item
            </button>
            <div>
                {root?.map((item, index) => (
                    <button>
                        {data?.[item].data.name} {index}
                    </button>
                ))}
            </div>

            <pre>{JSON.stringify({ path, root, data }, null, 2)}</pre>
        </div>
    );
}

export default App;
