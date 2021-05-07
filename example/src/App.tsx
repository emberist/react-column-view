import React from "react";
import { useColumnView } from "react-column-view";

type Item = {
    id: string;
    name: string;
};

function App() {
    const { path, insert, data } = useColumnView<Item>();

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
                {" "}
                Add item
            </button>
            <pre>{JSON.stringify({ path, data }, null, 2)}</pre>
        </div>
    );
}

export default App;
