import { useState, useEffect } from "react";
import userImage from '../../assets/userImage.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [username, setUsername] = useState("");
    const [buttonClicked, setButtonClicked] = useState(""); // New state to track button clicks
    const navigate = useNavigate();

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, [username]);

    const handleButtonClick = (destination) => {
        navigate(destination);
        setButtonClicked(destination); // Set the clicked button state to the destination path
        // We reset the buttonClicked state after a short delay to remove the click effect
        setTimeout(() => {
            setButtonClicked("");
        }, 300);
    };

    return (
        <div className="flex flex-col w-60 mr-10 mt-16">
            <div className='flex flex-col items-center ' onClick={() => { navigate("/") }}>
                <img src={userImage} alt="userImage" className='h-20 w-20' />
                <div className="text-white font-bold py-2 px-4 flex justify-center">{username}</div>
            </div>
            <div className='flex flex-col mt-6'>
                <button
                    className={`bg-slate-500 hover:bg-slate-700 text-white font-bold py-10 px-6 rounded mt-4 ${
                        buttonClicked === "/playground" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => { handleButtonClick("/playground") }}
                    disabled={buttonClicked === "/playground"} // Disable the button when clicked
                >
                    Practise
                </button>
                <button
                    className={`bg-slate-500 hover:bg-slate-700 text-white font-bold py-10 px-6 rounded mt-4 ${
                        buttonClicked === "/public" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => { handleButtonClick("/public") }}
                    disabled={buttonClicked === "/public"} // Disable the button when clicked
                >
                    Compete with People
                </button>
                <button
                    className={`bg-slate-500 hover:bg-slate-700 text-white font-bold py-10 px-6 rounded mt-4 ${
                        buttonClicked === "/private" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => { handleButtonClick("/private") }}
                    disabled={buttonClicked === "/private"} // Disable the button when clicked
                >
                    Compete with Friends
                </button>
            </div>
            <div className='text-white font-bold py-2 px-4 mt-2 flex justify-center'>Made with ❤️ by 302B</div>
        </div>
    )
}

export default Header;
