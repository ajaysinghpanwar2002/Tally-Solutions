import React, { useState, useEffect } from "react";
import "../styles.css";

const PlayGround = () => {
    const [text, setText] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [lastLetter, setLastLetter] = useState("");
    const [words, setWords] = useState([]);
    const [completedWords, setCompletedWords] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [startTime, setStartTime] = useState(undefined);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [started, setStarted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [modes, setModes] = useState(0);
    const [selectedTimeMode, setSelectedTimeMode] = useState(90);

    const setTextAndWords = () => {
        const texts = [
            `since well off get would he another lead in hand those general govern because turn way take both stand make for because on when system keep eye one many possible develop we own might possible as to way problem than it even back make public you great time house you good man should what have or say time a too turn stand plan school very too any set just present take where what fact school know all year before course the up then form run need develop plan `,
            `The think most what any eye time, system public, place out under program, Part because each real change; small go mustn t say! Consider see thing he number form person up same, man write. Show but Public find a what long; (of) say No other can up, know old because, more one day year write? Public so Govern hold with (such) real time state call, now might own, by "those" run, program hold see right, look find, order that Problem on, own great home, more general man and end hold world at these get begin much, possible late face! Very "have" thing think come could. same, of day get want general open`,
            `Face last, point for Still large, follow those use end She line know come 91 make. Problem still say how, think see they in nation, still present, again I course 4757 little present, interest 894 then as, here set 604 they, who seem set all New part from if For 788 24 both those nation, day or 416 now. Ask leave. House interest, 7 that 2691 these! Year 8153 home 57 develop hand face, now that, people tell. since form more like govern who, 3312 than think, too "out" write, state those last, for place, point of 56 consider form, 5 can, then set another at nation which, off under, show 9106 state.`
        ];
        // const text = texts[Math.floor(Math.random() * texts.length)];
        const text = texts[modes];
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
        const diff = (now - startTime) / 1000; // Calculate time elapsed in seconds
        const wordsTyped = Math.ceil(completedWords.reduce((acc, word) => (acc += word.length), 0) / 5);
        const wpm = Math.ceil(wordsTyped / (diff / 60)); // Convert diff to minutes for WPM calculation
        setWpm(wpm);
        setTimeElapsed(selectedTimeMode - Math.floor(diff)); // Update time remaining in seconds
    };

    const handleTimeModeSelection = (timeMode) => {
        setSelectedTimeMode(timeMode);
    };
    useEffect(() => {
        let timerInterval;

        if (startTime && !completed) {
            timerInterval = setInterval(() => {
                const now = Date.now();
                const diff = (now - startTime) / 1000;
                const timeRemaining = selectedTimeMode - diff;

                if (timeRemaining <= 0) {
                    setCompleted(true);
                    clearInterval(timerInterval);
                } else {
                    setTimeElapsed(timeRemaining);
                }
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [startTime, completed, selectedTimeMode]);

    if (!started) {
        return (
            <div className="flex mt-56 mx-36">
                <div className="container bg-slate-500 rounded ">
                    <h2>Welcome to the Typing game</h2>
                    <p>
                        <strong>Rules:</strong> <br />
                        Type in the input field the highlighted word. <br />
                        The correct words will turn <span className="green">green</span>.
                        <br />
                        Incorrect letters will turn <span className="red">red</span>.
                        <br />
                        <br />
                        Have fun!
                    </p>
                    <div className="my-4">
                        <button className="start-btn mr-5">Choose difficulty </button>
                        <button className="start-btn ml-2 rounded" onClick={() => { setModes(0) }}>Easy</button>
                        <button className="start-btn ml-2 rounded" onClick={() => { setModes(1) }}>Medium</button>
                        <button className="start-btn ml-2 rounded" onClick={() => { setModes(2) }}>Hard</button>
                    </div>
                    <button className="start-btn rounded" onClick={() => setStarted(true)}>
                        Start game
                    </button>
                </div>
            </div>
        );
    }

    if (!text) return <p>Loading...</p>;

    if (completed) {
        return (
            <div className="container mt-44 ml-20">
                <h2>
                    Your WPM is <strong>{wpm}</strong>
                </h2>
                <button className="start-btn" onClick={() => setStarted(true)}>
                    Play again
                </button>
            </div>
        );
    }

    return (
        <div className="flex mt-48 w-4/5 justify-center ml-36 bg-slate-500">
            <div className="wpm">
                <strong>WPM: </strong>
                {wpm}
                <br />
                <strong>Time: </strong>
                {Math.floor(timeElapsed * 60)}s
            </div>
            <div className="flex flex-col" >
                <button onClick={() => handleTimeModeSelection(90)} className="bg-slate-500 hover:bg-slate-300 text-white font-bold py-10 px-6 rounded mt-4" >90 seconds</button>
                <button onClick={() => handleTimeModeSelection(60)} className="bg-slate-500 hover:bg-slate-300 text-white font-bold py-10 px-6 rounded mt-4" >60 seconds</button>
                <button onClick={() => handleTimeModeSelection(30)} className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-10 px-6 rounded mt-4" >30 seconds</button>
            </div>
            <div className="container rounded">
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
    );
};

export default PlayGround;
