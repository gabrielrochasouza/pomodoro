import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import RingSound from "../../assets/ring.wav";
import CircularProgressWithLabel from "../circularProgressWithLabel";
import { setInHistoryMemory } from "../../utils";
import { useConfig } from "../../provider/config";
import { usePomodoro } from "../../provider/pomodoro";

const TimerClock = () => {
  const {
    started,
    cyclesMade,
    restTime,
    alreadyStarted,
    setStarted,
    setAlreadyStarted,
    setCyclesMade,
    setRestTime,
  } = usePomodoro();

  const { quantityOfCycles, title, restingMinutes, workingMinutes } =
    useConfig();

  const [workingSeconds, setWorkingSeconds] = useState(
    Number(workingMinutes) * 60
  );

  const playStopSound = () => new Audio(RingSound).play();

  const changeMode = () => {
    setAlreadyStarted(true);
    setRestTime(!restTime);
    setWorkingSeconds(
      !restTime ? Number(restingMinutes) * 60 : Number(workingMinutes) * 60
    );
    playStopSound();
    document.title = "Pomodoro";
  };

  const addCounterCycle = () => {
    setCyclesMade(cyclesMade + 1);
    setInHistoryMemory({ title, workingMinutes: Number(workingMinutes) });
  };

  const runTicTacTimer = () => {
    if (workingSeconds > 0) {
      document.title =
        currentMinutesString + ":" + currentSecondsString + " Pomodoro";
      setWorkingSeconds(workingSeconds - 1);
    }
  };
  const verifyIfCycleFinished = () => {
    return workingSeconds === 0;
  };

  const verifyIfAllCyclesFinished = () =>
    cyclesMade + 1 === Number(quantityOfCycles);

  const ifAllCyclesAreFinishedGoBackToStartMode = () => {
    if (verifyIfAllCyclesFinished()) {
      setWorkingSeconds(Number(workingMinutes) * 60);
      setAlreadyStarted(false);
      document.title = "Pomodoro";
    }
  };

  const runTimer = () => {
    if (started) {
      runTicTacTimer();
      if (verifyIfCycleFinished()) {
        if (!restTime) {
          addCounterCycle();
        }
        changeMode(); // modes are work time or rest time
        setStarted(false);
        ifAllCyclesAreFinishedGoBackToStartMode();
      }
    }
  };

  useEffect(() => {
    if (!alreadyStarted) {
      document.title = "Pomodoro";
    }
    setTimeout(() => {
      runTimer();
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
    setWorkingSeconds(Number(workingMinutes) * 60);
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
            <>
              <div>
                <CircularProgressWithLabel
                  value={
                    100 -
                    100 *
                      Number(
                        (
                          Number(workingSeconds) /
                          (Number(restingMinutes) * 60)
                        ).toFixed(2)
                      )
                  }
                />
              </div>
              <Typography variant="h6" component={"div"}>
                {"Descanse"}
              </Typography>
            </>
          ) : (
            <>
              <div>
                <CircularProgressWithLabel
                  value={
                    100 -
                    100 *
                      Number(
                        (
                          Number(workingSeconds) /
                          (Number(workingMinutes) * 60)
                        ).toFixed(2)
                      )
                  }
                />
              </div>
              <Typography variant="h6" component={"div"}>
                {title || "Atividade"}
              </Typography>
            </>
          )}
        </h1>
        <div
          style={{
            fontSize: "4.5rem",
            marginBottom: "30px",
            fontWeight: "bold",
          }}
        >
          {currentMinutesString}:{currentSecondsString}{" "}
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
