import { useContext, createContext, useState } from "react";
import { IProvider, IPomodoro } from "../../interfaces";

const PomodoroContext = createContext<IPomodoro>({} as IPomodoro);

const PomodoroProvider = ({ children }: IProvider) => {
  const [started, setStarted] = useState(false);
  const [alreadyStarted, setAlreadyStarted] = useState(false);
  const [cyclesMade, setCyclesMade] = useState(0);
  const [restTime, setRestTime] = useState(false);
  const [currentMinutes, setCurrentMinutes] = useState<number>(0);
  return (
    <PomodoroContext.Provider
      value={{
        started,
        cyclesMade,
        restTime,
        currentMinutes,
        alreadyStarted,
        setStarted,
        setAlreadyStarted,
        setCyclesMade,
        setRestTime,
        setCurrentMinutes,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroProvider;

export const usePomodoro = () => useContext(PomodoroContext);
