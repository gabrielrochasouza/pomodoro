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
    <Container sx={{padding: '0'}}>
      <Card sx={{ padding: "1rem", margin: "2rem 0.2rem 0" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
