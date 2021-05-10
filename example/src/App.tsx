import React from "react";
import ColumnView from "./components/ColumnView";

function App() {
    return (
        <div
            className={
                "bg-gray-400 pin h-screen w-screen flex flex-col items-center justify-center"
            }
        >
            <div className={"text-4xl sm:text-6xl lg:text-7xl font-bold pb-10 text-white"}>
                React Column View
            </div>
            <div className={"md:container flex justify-center items-center"}>
                <ColumnView />
            </div>
        </div>
    );
}

export default App;
