import React, { useState } from "react";
import api from "../../api";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteAllTodos = ({ todos, setTodos }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await api.delete(`/todo/todos`);
      setTodos([]);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting all todos:", error);
    }
  };

  return (
    <div className="d-flex justify-content-end">
      {todos.length > 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={handleClickOpen}
          style={{ fontFamily: "inherit" }}
        >
          <i className="bi bi-trash-fill"></i> Delete All
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ fontFamily: "inherit" }}
      >
        <DialogTitle id="alert-dialog-title">{"Delete All Todos"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete all todos?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAllTodos;
