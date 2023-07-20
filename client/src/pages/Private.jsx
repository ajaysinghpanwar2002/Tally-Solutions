import { useState, useEffect } from "react";
import Counter from "../components/utils/Counter.jsx";
import axios from "axios";
import { SERVER_API, CLIENT_URL } from "../constants.js";
import { Loader } from '../components';
import copyIcon from '../assets/copyIcon.png';
import { useNavigate } from 'react-router-dom';

function Private() {
    const [lobbySize, setLobbySize] = useState(5);
    const [loading, setLoading] = useState(false);
    const [modes, setModes] = useState("Easy");
    const [lobbyId, setLobbyId] = useState("");
    const [showPrivateUrl, setShowPrivateUrl] = useState(false);
    const [privateUrl, setPrivateUrl] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedUserId = localStorage.getItem("userid");
        if (savedUserId) {
            setUserId(savedUserId);
        }
    }, []);

    const handleLobbySizeChange = (newSize) => {
        setLobbySize(newSize);
    };

    const URL = `${SERVER_API}/lobby/private`;

    const handleClick = async () => {
        console.log("clicked");
        try {
            setLoading(true);
            const payload = {
                userid: userId,
                lobbyType: "private",
                lobbySize: lobbySize,
                modes: modes,
            };
            const response = await axios.post(URL, payload);
            console.log(response);
            localStorage.setItem("lobbyid", response.data);
            setLobbyId(response.data);
            setShowPrivateUrl(true);
            await setPrivateUrl(`${CLIENT_URL}/private/${response.data}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleCopyClick = () => {
        const textarea = document.createElement('textarea');
        textarea.value = privateUrl;
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');

        document.body.removeChild(textarea);
        alert("text copied to clipboard");
    };

    return (
        <div className="mx-20">
            {loading ? <Loader /> : (
                <div>
                    <div className="text-white text-3xl font-bold mt-10 ">TypeWarriors</div>
                    <div>
                        {
                            showPrivateUrl ? (
                                <div className="mt-20">
                                    <div className="text-slate-800 text-2xl font-bold">Share this Url with your friends to let them in 😁</div>
                                    <div className="text-white text-xl font-thin px-2 bg-slate-500 p-0.5 rounded cursor-pointer mt-8 flex justify-between items-center" onClick={handleCopyClick}>
                                        {privateUrl}
                                        <img src={copyIcon} alt="copy" className="h-4" />
                                    </div>
                                    <div className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 rounded mt-4 flex justify-center'>
                                        <button onClick={()=>{navigate(`/private/${lobbyId}`)}}>Join the Private Lobby</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex mt-20">
                                        <div className="flex justify-center bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-10">
                                            Lobby size: <Counter onCountChange={handleLobbySizeChange} />
                                        </div>
                                        <div className="mt-10 ml-10 flex">
                                            <p className="text-slate-800 text-2xl font-bold">Choose Difficulty: </p>
                                            <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => { setModes("Easy") }} >Easy</p>
                                            <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => { setModes("Medium") }} >Medium</p>
                                            <p className="text-white text-xl font-thin px-2 ml-2  bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => { setModes("Hard") }} >Hard</p>
                                        </div>
                                    </div>
                                    <button
                                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 mt-20 rounded"
                                        onClick={handleClick}
                                    >Create Private lobby😉</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default Private;
