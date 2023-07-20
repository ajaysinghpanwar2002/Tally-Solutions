import { useState } from "react";
import axios from "axios";
import { SERVER_API } from "../../constants";
import Loader from './Loader.jsx';

function UserInput() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

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

            const userCreated = await axios.post(URL, payload);
            console.log("UserCreated", userCreated);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setUsername("");
        }
    };

    return (
        <div>{
            loading ? <Loader /> : (
                <div className="flex justify-center mt-64">
                    <input
                        type="text"
                        placeholder="enter your name"
                        onChange={handleChange}
                        value={username}
                        className="placeholder-gray-800 text-gray-900 bg-slate-400 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-2/5"
                    />
                    <button
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                    >
                        {!username ? "Submit as Random User" : `Submit as ${username}`}
                    </button>
                </div>
            )
        }
        </div>
    );
}

export default UserInput;
