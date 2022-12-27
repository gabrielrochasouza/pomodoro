import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card sx={{ padding: "1rem", margin: "2rem" }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Histórico
        </Typography>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            component={"div"}
            sx={{ textAlign: "center" }}
          >
            Ainda não há nada registrado no histórico...
          </Typography>
          <Button
            sx={{ marginTop: "1rem" }}
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default History;
