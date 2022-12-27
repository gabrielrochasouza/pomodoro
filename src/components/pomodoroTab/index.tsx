import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import TimerClock from "../timerClock";

interface PomodoroParams {
  workingMinutes: Number | any;
  restingMinutes: Number | any;
  started: boolean;
  setStarted: (param: boolean) => void;
  setAlreadyStarted: (param: boolean) => void;
  title: String | undefined;
  quantityOfCycles: String | undefined | null;
}

const PomodoroTab = ({
  workingMinutes,
  restingMinutes,
  quantityOfCycles,
  started,
  setStarted,
  title,
  setAlreadyStarted,
}: PomodoroParams) => {
  const [cyclesMade, setCyclesMade] = useState(0);
  const [restTime, setRestTime] = useState(false);
  const [currentMinutes, setCurrentMinutes] = useState<Number>(
    restTime ? restingMinutes : workingMinutes
  );

  return (
    <Container sx={{ width: "100%", padding: "0" }}>
      <TimerClock
        currentMinutes={currentMinutes}
        started={started}
        setStarted={setStarted}
        title={title}
        setCurrentMinutes={setCurrentMinutes}
        setRestTime={setRestTime}
        setCyclesMade={setCyclesMade}
        restTime={restTime}
        cyclesMade={cyclesMade}
        quantityOfCycles={quantityOfCycles}
        workingMinutes={workingMinutes}
        restingMinutes={restingMinutes}
        setAlreadyStarted={setAlreadyStarted}
      />

      <Grid sx={{ textAlign: "center", marginTop: "16px" }}>
        <p>
          Número de Ciclos: {cyclesMade} / {quantityOfCycles}
        </p>
      </Grid>
    </Container>
  );
};

export default PomodoroTab;
