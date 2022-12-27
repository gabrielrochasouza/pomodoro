import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import RingSound from "../../assets/ring.wav";
import CircularProgressWithLabel from "../circularProgressWithLabel";

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

interface workMemoryParam {
  title?: String;
  workingMinutes: number;
  cycles: number;
  timeFinished: string;
}

interface historyMemory {
  date: string;
  works: workMemoryParam[];
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
  const setInHistoryMemory = () => {
    const arrayObjectToBeSaved: historyMemory[] = [
      {
        date: new Date().toLocaleDateString(),
        works: [
          {
            title,
            timeFinished: new Date().toLocaleTimeString(),
            workingMinutes,
            cycles: 1,
          },
        ],
      },
    ];
    if (localStorage.getItem("@history")) {
      const previousMemoryHistory: historyMemory[] =
        JSON.parse(localStorage.getItem("@history") || "") ||
        arrayObjectToBeSaved;
      const alreadyThereIsADate: historyMemory | undefined =
        previousMemoryHistory?.find(
          (memo: historyMemory): boolean =>
            memo.date === new Date().toLocaleDateString()
        );
      if (alreadyThereIsADate) {
        const work: workMemoryParam | undefined =
          alreadyThereIsADate.works?.find(
            (work: workMemoryParam): boolean =>
              work.title === title && work.workingMinutes === workingMinutes
          );
        if (work) {
          work.cycles++;
          work.timeFinished = new Date().toLocaleTimeString();
        } else {
          alreadyThereIsADate.works.push({
            title,
            timeFinished: new Date().toLocaleTimeString(),
            workingMinutes,
            cycles: 1,
          });
        }
        localStorage.setItem("@history", JSON.stringify(previousMemoryHistory));
      } else {
        previousMemoryHistory.push(arrayObjectToBeSaved[0]);
        localStorage.setItem("@history", JSON.stringify(previousMemoryHistory));
      }
    } else {
      localStorage.setItem("@history", JSON.stringify(arrayObjectToBeSaved));
    }
  };

  const play = () => new Audio(RingSound).play();
  const [workingSeconds, setWorkingSeconds] = useState(currentMinutes * 60);
  const runTimerWorking = () => {
    if (started) {
      if (workingSeconds > 0) {
        setWorkingSeconds(workingSeconds - 1);
      } else {
        if (!restTime) {
          setCyclesMade(cyclesMade + 1);
          setInHistoryMemory();
        }
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
