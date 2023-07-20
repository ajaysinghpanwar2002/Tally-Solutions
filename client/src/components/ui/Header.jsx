import { useState, useEffect } from "react";
import userImage from '../../assets/userImage.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, [username]);
    return (
        <div className="flex flex-col w-60 mr-10 mt-28">
            <div className='flex flex-col items-center '>
                <img src={userImage} alt="userImage" className='h-20 w-20' />
                <div className="text-white font-bold py-2 px-4 flex justify-center">{username}</div>
            </div>
            <div className='flex flex-col mt-6'>
                <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-10 px-6 rounded mt-4' onClick={()=>{navigate("/playground");}}>Practise</button>
                <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-10 px-6 rounded mt-4' onClick={()=>{navigate("/public")}}>Compete with People</button>
                <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-10 px-6 rounded mt-4' onClick={()=>{navigate("/private")}}>Compete with Friends</button>
            </div>
            <div className='text-white font-bold py-2 px-4 mt-32 flex justify-center'>Made with Love by 302B</div>
        </div>
    )
}

export default Header