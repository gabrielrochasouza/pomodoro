import { useContext, createContext, useState } from "react";
import { IProvider, IPomodoro } from "../../interfaces";

const PomodoroContext = createContext<IPomodoro>({} as IPomodoro);

const PomodoroProvider = ({ children }: IProvider) => {
  const [started, setStarted] = useState(false);
  const [alreadyStarted, setAlreadyStarted] = useState(false);
  const [cyclesMade, setCyclesMade] = useState(0);
  const [restTime, setRestTime] = useState(false);
  const [workingSeconds, setWorkingSeconds] = useState(0);

  const restart = (workingMinutes: number) => {
    setCyclesMade(0);
    setWorkingSeconds(Number(workingMinutes) * 60);
    setRestTime(false);
    setStarted(false);
    setAlreadyStarted(false);
  };

  return (
    <PomodoroContext.Provider
      value={{
        started,
        cyclesMade,
        restTime,
        alreadyStarted,
        workingSeconds,
        setWorkingSeconds,
        setStarted,
        setAlreadyStarted,
        setCyclesMade,
        setRestTime,
        restart,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroProvider;

export const usePomodoro = () => useContext(PomodoroContext);
