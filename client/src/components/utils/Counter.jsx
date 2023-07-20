import { useState } from "react";

function Counter({ onCountChange }) {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        onCountChange(newCount); 
    };

    const handleDecrement = () => {
        const newCount = count - 1;
        setCount(newCount);
        onCountChange(newCount); 
    };

    return (
        <div className="flex">
            <button onClick={handleDecrement} className="px-2">
                -
            </button>
            <h2 className="text-black">{count}</h2>
            <button onClick={handleIncrement} className="px-2">
                +
            </button>
        </div>
    );
}

export default Counter;
