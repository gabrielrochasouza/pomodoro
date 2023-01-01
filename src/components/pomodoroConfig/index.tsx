import { Card, FormControlLabel, Switch, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useEffect } from "react";
import { useConfig } from "../../provider/config";

const PomodoroConfig = () => {
  const {
    title,
    quantityOfCycles,
    restingMinutes,
    workingMinutes,
    setQuantityOfCycles,
    setRestingMinutes,
    setTitle,
    setWorkingMinutes,
  } = useConfig();

  const verifyError = (val: String | undefined | null) =>
    !val ? false : Number(val) > 0 ? false : true;

  const begin = (e: any) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.title = "Pomodoro";
  }, []);

  return (
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
        </FormControl>
      </form>
    </Card>
  );
};

export default PomodoroConfig;
