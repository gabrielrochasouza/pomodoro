import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { IDialogAlert } from "../../interfaces";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogAlert = ({ handleClose, handleConfirm, open }: IDialogAlert) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Atenção!!"}</DialogTitle>
      <DialogContentText sx={{ padding: "1rem" }}>
        Isso irá resetar o seu timer
      </DialogContentText>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
        <Button onClick={handleConfirm}>Continuar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlert;
