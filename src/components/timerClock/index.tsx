import { useEffect, useState, useRef } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import RingSound from "../../assets/ring.wav";
import CircularProgressWithLabel from "../circularProgressWithLabel";
import { setInHistoryMemory, notifyMe } from "../../utils";
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
    Math.round(Number(workingMinutes) * 60)
  );

  const playStopSound = () => new Audio(RingSound).play();

  const timerId: any = useRef();

  const startTimer = () => {
    if (!started) {
      setStarted(true);
      timerId.current = setInterval(() => {
        setWorkingSeconds((prev) => prev - 1);
      }, 1000);
    }
  };

  const setTitle = () => {
    const mode = restTime ? "Descansar" : "Concentrar";
    document.title =
      currentMinutesString + ":" + currentSecondsString + " " + mode;
    if (cyclesMade === Math.round(Number(quantityOfCycles))) {
      document.title = "Pomodoro";
    }
  };

  useEffect(() => {
    if (!alreadyStarted && "Notification" in window) {
      Notification.requestPermission();
    }
    setTitle();
    if (workingSeconds === 0) {
      playStopSound();
      stopTimer();
      setRestTime(!restTime);
      if (!restTime) {
        notifyMe("Hora de Descansar");
        setCyclesMade(cyclesMade + 1);
        setInHistoryMemory({
          workingMinutes: Math.round(Number(workingMinutes)),
          title,
        });
      } else {
        notifyMe("Hora de se Concentrar");
      }
      setWorkingSeconds(
        !restTime
          ? Math.round(Number(restingMinutes) * 60)
          : Math.round(Number(workingMinutes) * 60)
      );
    }
  }, [workingSeconds]);

  const stopTimer = () => {
    setStarted(false);

    clearInterval(timerId.current);
  };

  const currentMinutesString = workingSeconds
    ? String(Math.floor(workingSeconds / 60)).padStart(2, "0")
    : "00";
  const currentSecondsString = workingSeconds
    ? String(workingSeconds % 60).padStart(2, "0")
    : "00";

  const porcentage = restTime
    ? 100 -
      100 *
        Number(
          (Number(workingSeconds) / (Number(restingMinutes) * 60)).toFixed(2)
        )
    : 100 -
      100 *
        Number(
          (Number(workingSeconds) / (Number(workingMinutes) * 60)).toFixed(2)
        );

  const restart = () => {
    setCyclesMade(0);
    setWorkingSeconds(Math.round(Number(workingMinutes) * 60));
    setRestTime(false);
    setStarted(false);
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem" }}>
          {Math.round(Number(quantityOfCycles)) === cyclesMade ? (
            <>Finalizado</>
          ) : restTime ? (
            <>
              <div>
                <CircularProgressWithLabel value={porcentage} />
              </div>
              <Typography variant="h6" component={"div"}>
                {"Descanse"}
              </Typography>
            </>
          ) : (
            <>
              <div>
                <CircularProgressWithLabel value={porcentage} />
              </div>
              <Typography variant="h6" component={"div"}>
                {title || "Atividade"}
              </Typography>
            </>
          )}
        </h1>

        {Math.round(Number(quantityOfCycles)) === cyclesMade ? (
          <Button variant="outlined" onClick={restart}>
            Recome??ar
          </Button>
        ) : (
          <>
            <div
              style={{
                fontSize: "4.5rem",
                marginBottom: "30px",
                fontWeight: "bold",
              }}
            >
              {currentMinutesString}:{currentSecondsString}{" "}
            </div>
            <Button
              variant="outlined"
              onClick={() => {
                setAlreadyStarted(true);
                if (!started) {
                  startTimer();
                } else {
                  stopTimer();
                }
              }}
            >
              {started ? "Parar" : "Contar Tempo"}
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default TimerClock;
