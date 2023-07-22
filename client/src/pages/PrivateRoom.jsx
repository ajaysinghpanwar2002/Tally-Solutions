import { useParams } from 'react-router-dom';
import { Loader } from '../components';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SERVER_API,CLIENT_URL } from '../constants';
import "../styles.css";
import { useNavigate } from 'react-router-dom';
import copyIcon from '../assets/copyIcon.png';

const socket = io.connect(`${SERVER_API}`);

function PrivateRoom() {
    let { roomid } = useParams();

    const [userCount, setUserCount] = useState(0);
    const [loading, setLoading] = useState(true); // Set the initial loading state to true
    const [text, setText] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [lastLetter, setLastLetter] = useState("");
    const [words, setWords] = useState([]);
    const [completedWords, setCompletedWords] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [startTime, setStartTime] = useState(undefined);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [started, setStarted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [privateUrl,setPrivateUrl] = useState(`${CLIENT_URL}/private/${roomid}`)
    const navigate = useNavigate();

    const [otherUsersPorgress, setOtherUsersPorgress] = useState("");
    const handleCopyClick = () => {
        const textarea = document.createElement('textarea');
        textarea.value = privateUrl;
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy');

        document.body.removeChild(textarea);
        alert("text copied to clipboard");
    };
    useEffect(() => {
        socket.emit("join_rooom", roomid);
        const loaderTimer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(loaderTimer);
    }, []);


    useEffect(() => {
        socket.emit('ProgressUpdate', { progress, roomid });
    }, [progress])

    useEffect(() => {
        socket.on("recieved_progress", (data) => {
            setOtherUsersPorgress(data);
        })
        socket.on('updateUserCount', (count) => {
            setUserCount(count);
        });
    }, [socket])
    const setTextAndWords = () => {
        const texts = [
            `You never read a book on psychology, Tippy. You didn't need to. You knew by some divine instinct that you can make more friends in two months by becoming genuinely interested in other people than you can in two years by trying to get other people interested in you.`,
            // Add other texts here...
        ];
        const text = texts[Math.floor(Math.random() * texts.length)];
        const words = text.split(" ");
        setText(text);
        setWords(words);
        setCompletedWords([]);
    };

    useEffect(() => {
        if (started) {
            setTextAndWords();
            setStartTime(Date.now());
            setCompleted(false);
            setProgress(0);
        }
    }, [started]);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        const lastLetter = inputValue[inputValue.length - 1];

        const currentWord = words[0];

        if (lastLetter === " " || lastLetter === ".") {
            if (inputValue.trim() === currentWord) {
                const newWords = [...words.slice(1)];
                const newCompletedWords = [...completedWords, currentWord];

                const progress =
                    (newCompletedWords.length /
                        (newWords.length + newCompletedWords.length)) *
                    100;

                setWords(newWords);
                setCompletedWords(newCompletedWords);
                setInputValue("");
                setCompleted(newWords.length === 0);
                setProgress(progress);
            }
        } else {
            setInputValue(inputValue);
            setLastLetter(lastLetter);
        }

        calculateWPM();
    };

    const calculateWPM = () => {
        const now = Date.now();
        const diff = (now - startTime) / 1000 / 60;

        const wordsTyped = Math.ceil(
            completedWords.reduce((acc, word) => (acc += word.length), 0) / 5
        );

        const wpm = Math.ceil(wordsTyped / diff);

        setWpm(wpm);
        setTimeElapsed(diff);
    };

    if (otherUsersPorgress === 100 || progress === 100) {
        return (
            <div className='flex justify-center flex-col items-center'>
                {otherUsersPorgress > progress ? (
                    <div className='text-white text-2xl font-thin px-2   bg-slate-500 p-0.5 rounded mt-96 w-64'>
                        You lost the game 🗿
                    </div>
                ) : (
                    <div className='text-white text-2xl font-thin px-2  bg-slate-500 p-0.5 rounded mt-96 w-64'>
                        You won the game 🙌
                    </div>
                )}
                Thank you for joining this room. You can make new friends.
                <button onClick={() => navigate("/public")} className='text-white text-xl font-thin px-2 ml-2  bg-slate-500 p-0.5 rounded cursor-pointer w-44'>Explore new rooms</button>
            </div>
        );
    }

    if (userCount === 1) {
        return (
            <div><div className='flex justify-center mt-44 '>There is no active user in the lobby, share link </div>
                <div className='flex justify-center '>
                    <div className="text-white text-xl font-thin px-2 bg-slate-500 p-0.5 rounded cursor-pointer mt-8 flex justify-between items-center"
                        onClick={handleCopyClick}>
                        {privateUrl}
                        <img src={copyIcon} alt="copy" className="h-4 pl-2" />
                    </div>
                </div></div>
        )
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            {loading ? (
                <div className="relative z-50 mt-96">
                    Fetching Users with lobbyID, {roomid}
                    <Loader />
                </div>
            ) : (
                <div>
                    <div className=''>
                        <p className='text-xl '>Other`s progress</p>
                        <progress value={otherUsersPorgress} max="100" />
                        {/* <progress value="90" max="100" /> */}
                    </div>
                    <div className="container">
                        <h4>Type the text below</h4>
                        <progress value={progress} max="100" />
                        <p className="text">
                            {text.split(" ").map((word, w_idx) => {
                                let highlight = false;
                                let currentWord = false;

                                if (completedWords.length > w_idx) {
                                    highlight = true;
                                }

                                if (completedWords.length === w_idx) {
                                    currentWord = true;
                                }

                                return (
                                    <span
                                        className={`word ${highlight && "green"} ${currentWord && "underline"
                                            }`}
                                        key={w_idx}
                                    >
                                        {word.split("").map((letter, l_idx) => {
                                            const isCurrentWord = w_idx === completedWords.length;
                                            const isWronglyTyped = letter !== inputValue[l_idx];
                                            const shouldBeHighlighted = l_idx < inputValue.length;

                                            return (
                                                <span
                                                    className={`letter ${isCurrentWord && shouldBeHighlighted
                                                        ? isWronglyTyped
                                                            ? "red"
                                                            : "green"
                                                        : ""
                                                        }`}
                                                    key={l_idx}
                                                >
                                                    {letter}
                                                </span>
                                            );
                                        })}
                                    </span>
                                );
                            })}
                        </p>
                        <input
                            type="text"
                            onChange={handleChange}
                            value={inputValue}
                            autoFocus={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PrivateRoom