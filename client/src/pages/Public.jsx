import { Loader } from '../components';
import { useState, useEffect } from "react";
import { SERVER_API } from "../constants";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Public() {
    const [loading, setLoading] = useState(false);
    const [modes, setModes] = useState("");
    const [publicLobbyAvailable, setPublicLobbyAvailable] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const navigate = useNavigate();

    const URL = `${SERVER_API}/lobby/getpublic`;

    const FetchActiveLobbies = async () => {
        const payload = {
            modes: modes,
            lobbyType: "public"
        }
        const existingPublicLobby = await axios.get(URL, { params: payload }).then((response) => {
            console.log(response);
            setPublicLobbyAvailable(response.data);
            setDataFetched(true);
        });

        try {
            setLoading(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    {dataFetched ? (<div>
                        {publicLobbyAvailable.map((lobby) => (
                            <div
                                key={lobby.id}
                                className="bg-white rounded-lg shadow-lg p-4 m-4"
                                onClick={() => navigate(`/public/${lobby.id}`)}
                            >
                                <p className="text-gray-800 font-bold text-lg">ID: {lobby.id}</p>
                                <p className="text-gray-600">Lobby Size: {lobby.lobbySize}</p>
                                <p className="text-gray-600">Lobby Type: {lobby.lobbyType}</p>
                                <p className="text-gray-600">Modes: {lobby.modes}</p>
                            </div>
                        ))}
                    </div>
                    ) : (
                        <div className="flex flex-col justify-center mt-44">
                            <div className="ml-10 flex">
                                <p className="text-slate-800 text-3xl font-bold flex content-center justify-center">Choose Difficulty: </p>
                                <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => { setModes("Easy") }} >Easy</p>
                                <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => { setModes("Medium") }} >Medium</p>
                                <p className="text-white text-xl font-thin px-2 ml-2  bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => { setModes("Hard") }} >Hard</p>
                            </div>
                            <div
                                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-10 items-center w-96 ml-10"
                                onClick={FetchActiveLobbies}
                            >
                                Click here to make new friends 😊
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}

export default Public