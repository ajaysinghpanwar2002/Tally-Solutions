import { useEffect, useState } from "react"
import refreshImage from '../assets/refreshImage.png'
function PlayGround() {
    const [modes, setModes] = useState("easy");
    const [time, setTime] = useState("60");

    const refreshClicked = () =>{
        setModes("easy");
        setTime("60");
    }

    useEffect(() => {

    }, [modes, time])
    return (
        <div className="mx-20">
            <div className="text-white text-3xl font-bold mt-10 ">TypeWarriors</div>
            <div className="flex mt-14 justify-between">
                <div className="flex items-center">
                    <p className="text-slate-800 text-2xl font-bold">Difficulty :</p>
                    <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => { setModes("Easy") }} >Easy</p>
                    <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => { setModes("Medium") }} >Medium</p>
                    <p className="text-white text-xl font-thin px-2 ml-2  bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => { setModes("Hard") }} >Hard</p>
                </div>
                <div className="flex items-center">
                    <p className="text-slate-800 text-2xl font-bold">Time :</p>
                    <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => setTime("15")}>15</p>
                    <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => setTime("30")}>30</p>
                    <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => setTime("60")}>60</p>
                    <p className="text-white text-xl font-thin px-2 ml-2 bg-slate-500 p-0.5 rounded cursor-pointer" onClick={() => setTime("120")}>120</p>
                </div>
            </div>
            <div className="flex mt-10 justify-between">
                <div className="text-white text-xl font-thin px-2 bg-slate-500 p-0.5 rounded">
                    54 sec
                </div>
                <div className="text-white text-xl font-thin px-2 bg-slate-500 p-0.5 rounded">
                    62 wpm
                </div>
            </div>
            <div className="flex mt-10 justify-center text-white text-3xl font-bold px-2 bg-slate-500 p-6 rounded">
                group govern in early plan form since here at have say think know follow school for
                it just program this head right one call year govern in that much possible before
                house those would public no it look again without be increase general they
            </div>
            <div className="flex justify-center mt-5">
                <img src={refreshImage} alt="refresh" className="h-4 cursor-pointer" onClick={refreshClicked} />
            </div>
        </div>
    )
}

export default PlayGround