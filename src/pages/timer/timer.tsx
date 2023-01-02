import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { Box } from "@mui/material";
import PomodoroStepper from "../../components/PomodoroStepper";
import History from "../../components/history";
import { useConfig } from "../../provider/config";
import { usePomodoro } from "../../provider/pomodoro";
import DialogAlert from "../../components/DialogAlert";

const Timer = () => {
  const [value, setValue] = React.useState("1");
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { restart, alreadyStarted } = usePomodoro();
  const { workingMinutes } = useConfig();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (value === "1" && alreadyStarted) {
      handleOpen();
    } else {
      setValue(newValue);
    }
  };

  const handleConfirm = () => {
    restart(Number(workingMinutes));
    setValue("2");
    handleClose();
  };

  return (
    <TabContext value={value}>
      <Box
        sx={{
          width: "100%",
          bgColor: "secondary",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Pomodoro" value={"1"} />
          <Tab label="Historico" value={"2"} />
        </Tabs>
      </Box>
      <TabPanel value="1" sx={{ padding: "0" }}>
        <PomodoroStepper />
      </TabPanel>
      <TabPanel value="2" sx={{ padding: "0" }}>
        <History />
      </TabPanel>
      <DialogAlert
        handleClose={handleClose}
        open={open}
        handleConfirm={handleConfirm}
      />
    </TabContext>
  );
};

export default Timer;
