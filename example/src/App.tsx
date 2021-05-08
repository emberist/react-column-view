import React from "react";
import { useColumnView } from "react-column-view";
import { ListGroup, ListGroupItem } from "reactstrap";

type Item = {
    id: string;
    name: string;
};

function App() {
    const { insert, root, path, push, pop, data } = useColumnView<Item>();

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

            <div className={"p-2 mt-2"}>
                <ListGroup style={{ maxWidth: 250 }}>
                    {root?.map((item, index) => (
                        <ListGroupItem
                            active={path.includes(item)}
                            onClick={() => {
                                push(item);
                            }}
                        >
                            {data?.[item].data.name} {index}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>

            <pre>{JSON.stringify({ path, root, data }, null, 2)}</pre>
        </div>
    );
}

export default App;
