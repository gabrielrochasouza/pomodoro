import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import PomodoroTab from "../../components/pomodoroTab";

import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Timer = () => {
  const [open, setOpen] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const [alreadyStarted, setAlreadyStarted] = React.useState(false);

  const [workingMinutes, setWorkingMinutes] = React.useState<
    String | undefined | null
  >(localStorage.getItem("@workingMinutes") || null);

  const [restingMinutes, setRestingMinutes] = React.useState<
    String | undefined | null
  >(localStorage.getItem("@restingMinutes") || null);

  const [quantityOfCycles, setQuantityOfCycles] = React.useState<
    String | undefined | null
  >(localStorage.getItem("@quantityOfCycles") || null);

  const [title, setTitle] = React.useState(
    localStorage.getItem("@title") || ""
  );
  const [automaticTransitions, setAutomaticTransitions] =
    React.useState<boolean>(
      !localStorage.getItem("@automaticTransitions")
        ? false
        : localStorage.getItem("@automaticTransitions") === "true"
        ? true
        : false
    );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (value == "2" && alreadyStarted) {
      handleClickOpen();
    } else {
      setValue(newValue);
    }
  };

  const verifyError = (val: String | undefined | null) =>
    !val ? false : Number(val) > 0 ? false : true;

  const verifyValidation = () => {
    return (
      workingMinutes &&
      restingMinutes &&
      quantityOfCycles &&
      Number(workingMinutes) > 0 &&
      Number(restingMinutes) > 0 &&
      Number(quantityOfCycles) > 0
    );
  };

  const begin = (e: any) => {
    e.preventDefault();
    if (verifyValidation()) {
      setValue("2");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
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
          <Tab label="Configuração" value={"1"} />
          <Tab disabled={!verifyValidation()} label="Pomodoro" value={"2"} />
        </Tabs>
      </Box>
      <TabPanel value="1" sx={{padding:'0'}}>
        <Card
          variant="outlined"
          sx={{ padding: "1.5rem", maxWidth: "800px", margin: "2rem auto 0" }}
        >
          <form onSubmit={begin}>
            <FormControl fullWidth required>
              <h2
                style={{
                  textAlign: "center",
                  margin: "0 0 10px",
                  fontSize: "1.1rem",
                }}
              >
                Insira as informações
              </h2>
              <TextField
                size="small"
                margin="dense"
                fullWidth
                name="title"
                label="Título da atividade"
                type={"string"}
                value={title}
                onChange={(e) => {
                  localStorage.setItem("@title", e.target.value);
                  setTitle(e.target.value);
                }}
              />
              <TextField
                required
                name="workingMinutes"
                size="small"
                margin="dense"
                label="Minutos de Trabalho"
                fullWidth
                type={"number"}
                value={workingMinutes === null ? "" : workingMinutes}
                onChange={(e) => {
                  localStorage.setItem("@workingMinutes", e.target.value);
                  setWorkingMinutes(e.target.value);
                }}
                error={verifyError(workingMinutes)}
                helperText={verifyError(workingMinutes) && "Valor Inválido"}
              />
              <TextField
                required
                name="restingMinutes"
                size="small"
                margin="dense"
                fullWidth
                type={"number"}
                label="Minutos de Descanso"
                value={restingMinutes === null ? "" : restingMinutes}
                onChange={(e) => {
                  localStorage.setItem("@restingMinutes", e.target.value);
                  setRestingMinutes(e.target.value);
                }}
                error={verifyError(restingMinutes)}
                helperText={verifyError(restingMinutes) && "Valor Inválido"}
              />

              <TextField
                required
                name="quantityOfCycles"
                size="small"
                margin="dense"
                fullWidth
                label="Quantidade de Ciclos"
                type={"number"}
                value={quantityOfCycles === null ? "" : quantityOfCycles}
                onChange={(e) => {
                  localStorage.setItem("@quantityOfCycles", e.target.value);
                  setQuantityOfCycles(e.target.value);
                }}
                error={verifyError(quantityOfCycles)}
                helperText={verifyError(quantityOfCycles) && "Valor Inválido"}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={!automaticTransitions ? false : true}
                    onChange={(e) => {
                      setAutomaticTransitions(!automaticTransitions);
                      localStorage.setItem(
                        "@automaticTransitions",
                        String(!automaticTransitions)
                      );
                    }}
                  />
                }
                label="Transições automáticas"
              />
              <Button
                sx={{ margin: ".4rem 0 0rem" }}
                variant="outlined"
                color="primary"
                size="large"
                type="submit"
                disabled={!verifyValidation()}
              >
                Começar
              </Button>
            </FormControl>
          </form>
        </Card>
      </TabPanel>
      <TabPanel value="2">
        <PomodoroTab
          workingMinutes={workingMinutes}
          restingMinutes={restingMinutes}
          quantityOfCycles={quantityOfCycles}
          started={started}
          setStarted={setStarted}
          title={title}
          setAlreadyStarted={setAlreadyStarted}
        />
      </TabPanel>

      <Dialog
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
      </Dialog>
    </TabContext>
  );
};

export default Timer;
