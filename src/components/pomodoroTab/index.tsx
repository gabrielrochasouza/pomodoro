import { Container, Grid } from "@mui/material";
import { useConfig } from "../../provider/config";
import { usePomodoro } from "../../provider/pomodoro";
import TimerClock from "../timerClock";

const PomodoroTab = () => {
  const { cyclesMade } = usePomodoro();
  const { quantityOfCycles } = useConfig();

  return (
    <Container sx={{ width: "100%", padding: "0" }}>
      <TimerClock />

      <Grid sx={{ textAlign: "center", marginTop: "16px" }}>
        Número de Ciclos: {cyclesMade} / {quantityOfCycles}
      </Grid>
    </Container>
  );
};

export default PomodoroTab;
