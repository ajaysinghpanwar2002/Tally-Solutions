import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../constants";
import Loader from './Loader.jsx';
import { useNavigate } from 'react-router-dom';
import ChooseOne from '../../assets/ChooseOne.png';

function UserInput() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUsername(savedUsername);
        }
    }, []);

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const generateRandomUsername = () => {
        const randomUsername = `user_${Math.floor(Math.random() * 10000)}`;
        return randomUsername;
    };

    const URL = `${SERVER_API}/users/createuser`;

    const handleSubmit = async () => {
        try {
            setLoading(true);

            let finalUsername = username;

            if (!username) {
                finalUsername = generateRandomUsername();
            }

            const payload = {
                name: finalUsername,
                accuracy: "",
                wpm: "",
                lobbyRank: 0,
                lobbyType: "",
            };

            localStorage.setItem("username", finalUsername);
            const userCreated = await axios.post(URL, payload).then((response) => {
                localStorage.setItem("userid", response.data);
                navigate("/playground");
            });

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setUsername("");
        }
    };

    return (
        <div>
            {loading ? <Loader /> : (
                <div>
                    {username ? (
                        <div>
                            <div className="h-screen w-full  flex items-center justify-center pr-20">
                                {/* <img src={ChooseOne} alt="choose one" className="object-cover w-full h-full" /> */}
                                <img src={ChooseOne} alt="choose one" className="object-cover" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center mt-64">
                            <input
                                type="text"
                                placeholder="Enter your name, else We have a username 😁 for you"
                                onChange={handleChange}
                                value={username}
                                className="placeholder-gray-800 placeholder:text-center text-gray-900 bg-slate-400 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-2/5"
                            />
                            <button
                                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleSubmit}
                            >
                                {!username ? "Submit as Random User" : `Submit as ${username}`}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserInput;
