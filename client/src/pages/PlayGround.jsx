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

    if (!started) {
        return (
            <div className="flex mt-56 mx-36">
                <div className="container">
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
                    <button className="start-btn" onClick={() => setStarted(true)}>
                        Start game
                    </button>
                </div>
            </div>
        );
    }

    if (!text) return <p>Loading...</p>;

    if (completed) {
        return (
            <div className="container">
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
    );
};

export default PlayGround;
