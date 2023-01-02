import {
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { historyMemory, workMemoryParam } from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkIcon from "@mui/icons-material/Work";

const History = () => {
  const [historyInfo, setHistoryInfo] = useState<historyMemory[] | null>(null);
  useEffect(() => {
    if (localStorage.getItem("@history")) {
      const obj =
        JSON.parse(localStorage.getItem("@history") || "") ||
        ([] as historyMemory[]);
      const verification = Array.isArray(obj);
      if (verification) {
        setHistoryInfo(
          JSON.parse(localStorage.getItem("@history") || "") ||
            ([] as historyMemory[])
        );
      }
    }
    document.title = "Pomodoro";
  }, []);
  return (
    <Container sx={{ padding: "0" }}>
      <Card sx={{ padding: "1rem 0 ", margin: "2rem 0.2rem 0" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, padding: "0 1rem" }}
        >
          Histórico
        </Typography>
        <CardContent sx={{ textAlign: "center", padding: "0" }}>
          {historyInfo ? (
            <>
              {historyInfo.map(({ date, works }) => {
                return (
                  <Accordion key={date}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        Data: {date}, Tempo total:{" "}
                        {works.reduce(
                          (prev: number, current: workMemoryParam): number =>
                            Number(current.workingMinutes) *
                              Number(current.cycles) +
                            prev,
                          0
                        )}{" "}
                        min
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: "start", padding: "0" }}>
                      <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        sx={{ padding: "0" }}
                      >
                        {works.map((work: workMemoryParam, i: number) => (
                          <ListItemButton
                            key={date + ": " + i}
                            alignItems="flex-start"
                            sx={{
                              padding: "0",
                              borderBottom: "1px solid grey",
                            }}
                          >
                            <ListItemIcon>
                              <IconButton edge="end" aria-label="delete">
                                <WorkIcon />
                              </IconButton>
                            </ListItemIcon>
                            <ListItemText
                              primary={work.title}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {work.cycles} Ciclos
                                  </Typography>
                                  {" — tempo:" +
                                    work.workingMinutes +
                                    " min -- finalizado: " +
                                    work.timeFinished}
                                </React.Fragment>
                              }
                            />
                            <Divider />
                          </ListItemButton>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </>
          ) : (
            <Typography
              variant="body1"
              component={"div"}
              sx={{ textAlign: "center" }}
            >
              Ainda não há nada registrado no histórico...
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default History;
