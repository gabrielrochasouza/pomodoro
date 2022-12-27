import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import RingSound from "../../assets/ring.wav";

interface TimerParams {
  currentMinutes: Number | any;
  started: boolean;
  setStarted: (param: boolean) => void;
  title: String | undefined;
  setCurrentMinutes: (param: number) => void;
  setRestTime: (param: boolean) => void;
  setCyclesMade: (param: number) => void;
  setAlreadyStarted: (param: boolean) => void;
  restTime: boolean;
  cyclesMade: number;
  workingMinutes: number;
  restingMinutes: number;
  quantityOfCycles: String | null | undefined;
}

const TimerClock = ({
  currentMinutes,
  started,
  setStarted,
  title,
  setCurrentMinutes,
  setRestTime,
  setCyclesMade,
  restTime,
  cyclesMade,
  workingMinutes,
  restingMinutes,
  quantityOfCycles,
  setAlreadyStarted,
}: TimerParams) => {
  const play = () => new Audio(RingSound).play();
  const [workingSeconds, setWorkingSeconds] = useState(currentMinutes * 60);
  const runTimerWorking = () => {
    if (started) {
      if (workingSeconds > 0) {
        setWorkingSeconds(workingSeconds - 1);
      } else {
        if (!restTime) setCyclesMade(cyclesMade + 1);
        setRestTime(!restTime);
        setWorkingSeconds(
          !restTime ? restingMinutes * 60 : workingMinutes * 60
        );
        play();
        setStarted(false);
        if (cyclesMade + 1 === Number(quantityOfCycles))
          setWorkingSeconds(workingMinutes * 60);
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      runTimerWorking();
    }, 1000);
  }, [workingSeconds, started]);
  const currentMinutesString = workingSeconds
    ? String(Math.floor(workingSeconds / 60)).padStart(2, "0")
    : "00";
  const currentSecondsString = workingSeconds
    ? String(workingSeconds % 60).padStart(2, "0")
    : "00";

  const restart = () => {
    setCyclesMade(0);
    setWorkingSeconds(workingMinutes * 60);
    setRestTime(false);
    setStarted(true);
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem" }}>
          {Number(quantityOfCycles) === cyclesMade ? (
            <>Finalizado</>
          ) : restTime ? (
            "Descanse"
          ) : (
            <>{title || "Atividade"}</>
          )}
        </h1>
        <div style={{ fontSize: "4rem", marginBottom: "30px" }}>
          {currentMinutesString} : {currentSecondsString}{" "}
        </div>
        {Number(quantityOfCycles) === cyclesMade ? (
          <Button variant="outlined" onClick={restart}>
            Recomeçar
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              setAlreadyStarted(true);
              setStarted(!started);
            }}
          >
            {started ? "Parar" : "Contar Tempo"}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default TimerClock;
