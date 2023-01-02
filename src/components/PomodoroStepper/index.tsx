import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import PomodoroConfig from "../pomodoroConfig";
import PomodoroTab from "../pomodoroTab";
import { useConfig } from "../../provider/config";
import { usePomodoro } from "../../provider/pomodoro";
import DialogAlert from "../DialogAlert";

const steps = ["Configurar", "Rodar o timer"];

const PomodoroStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const { verifyValidation, workingMinutes } = useConfig();
  const { restart, alreadyStarted } = usePomodoro();

  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    restart(Number(workingMinutes));
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    handleClose();
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 1 && alreadyStarted) {
      handleOpen();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <Container sx={{ padding: { ms: "4rem 2rem ", xs: "1rem 0" } }}>
      <Box
        sx={{
          width: "100%",
          padding: { ms: "4rem 2rem ", xs: "1rem 0" },
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <React.Fragment>
          <Box sx={{ mb: 0, mt: 3 }}>
            {activeStep === 0 ? <PomodoroConfig /> : <PomodoroTab />}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 0 }}>
            {activeStep !== 0 && (
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Voltar
              </Button>
            )}
            <Box sx={{ flex: "1 1 auto" }} />

            {activeStep === 0 && verifyValidation() && (
              <Button disabled={!verifyValidation()} onClick={handleNext}>
                Próximo
              </Button>
            )}
          </Box>
        </React.Fragment>
      </Box>
      <DialogAlert
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        open={open}
      />
    </Container>
  );
};

export default PomodoroStepper;
