import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const handleDecrement = () => {
        setCount((prevCount) => prevCount - 1);
    };

    return (
        <div className="flex">
            <button onClick={handleDecrement} className="px-2">-</button>
            <h2>{count}</h2>
            <button onClick={handleIncrement} className="px-2">+</button>
        </div>
    );
}

export default Counter;
