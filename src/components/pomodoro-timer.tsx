import React from "react";
import { useInterval } from "../hooks/useInterval";
import { secondsToTime } from "../utils/seconds-to-time";
import { Button } from "./button";
import { Timer } from "./timer";

interface Props {
    defaultPomodoTimer: number;
    shortRestTime: number,
    longRestTime: number,
    cycles: number
}

export function PomodoTimer(props: Props) {

    const [mainTime, setMainTime] = React.useState(props.defaultPomodoTimer);
    const [timeCounting, setTimeCounting] = React.useState(false);
    const [resting, setResting] = React.useState(false);
    const [working, setWorking] = React.useState(false);
    const [cycles, setCycles] = React.useState(new Array(props.cycles -1).fill(true));
    const [completedCycles, setCompletedCycles] = React.useState(0);
    const [fullWorkingTime, setfullWorkingTime] = React.useState(0);
    const [numberOfPomodoros, setnumberOfPomodoros] = React.useState(0);


    const configureWork = () => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.defaultPomodoTimer);
    }

    const configureRest = (long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);
        if (long) {
            setMainTime(props.longRestTime);
        } else {
            setMainTime(props.shortRestTime);
        }
    }

    React.useEffect(() => {
        if(working) {document.body.classList.add("working");} 
        if(resting) {document.body.classList.remove("working");}

        if (mainTime > 0) return;

        if (working && cycles.length > 0) {
            configureRest(false);
            cycles.pop();
        } else if (working && cycles.length <= 0 ) { 
            configureRest(true);
            setCycles(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }

        if (working) setnumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) configureWork()
    }, [
            working, 
            resting, 
            mainTime, 
            configureRest,
            setCycles,
            setCompletedCycles,
            completedCycles, 
            numberOfPomodoros, 
            configureWork,
            props.cycles
        ]);


    

    useInterval(() => {
        setMainTime(mainTime - 1)
    }, timeCounting ? 1000 : null);

    return(
        <div className="pomodoro">
            <h2>You are {working? "working" : "resting"}</h2>
            <Timer mainTimer={mainTime}/>
            <div className="controls">
                <Button text="Work" onClick={configureWork}/>
                <Button text="Rest" onClick={() => configureRest(false)}/>
                <Button
                    className={!working && !resting ? "hidden" : ""}
                    text={timeCounting ? "Pause" : "Play"} 
                    onClick={() => setTimeCounting(!timeCounting)}
                />
            </div>

            <div className="details">
                <p>Ciclos Concluidos: {completedCycles}</p>
                <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
                <p>Pomodoros Concluidos: {numberOfPomodoros}</p>
            </div>
        </div>
    );
}