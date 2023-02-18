import React, { Dispatch, SetStateAction, useEffect } from "react";
interface Props {
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  timerActive: boolean;
  setTimerActive: Dispatch<SetStateAction<boolean>>;
}

export default function Timer({
  timer,
  setTimer,
  timerActive,
  setTimerActive,
}: Props) {
  useEffect(() => {
    let timeUpdate = setTimeout(() => {
      if (timerActive) {
        if (timer > 0) {
          setTimer((prev) => prev - 1);
        } else {
          setTimerActive(false);
        }
      }
    }, 1000);
    return () => clearTimeout(timeUpdate);
  }, [timer, timerActive, setTimer, setTimerActive]);

  return <h2 className="title-secondary">{timer}</h2>;
}
