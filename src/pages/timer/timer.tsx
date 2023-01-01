import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { Box } from "@mui/material";

import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import PomodoroStepper from "../../components/PomodoroStepper";
import History from "../../components/history";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Timer = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
      {/* <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Atenção!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Isso irá resetar o seu timer
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button
            onClick={() => {
              setValue("1");
              setStarted(false);
              setAlreadyStarted(false);
              handleClose();
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog> */}
    </TabContext>
  );
};

export default Timer;
