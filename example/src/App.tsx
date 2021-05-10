import React from "react";
import ColumnView from "./components/ColumnView";

function App() {
    return (
        <div className={"bg-gray-600 h-screen w-screen flex justify-center"}>
            <div className={"md:container flex justify-center items-center"}>
                <ColumnView />
            </div>
        </div>
    );
}

export default App;
