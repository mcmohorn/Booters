import * as React from "react";

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Slide, TextField } from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



export default function CreateJumpDialog(props) {

    const handleClickOpen = () => {
        //setOpen(true);
      };
    
      const handleClose = () => {
        // setOpen(false);
        props.onClose();
      };
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"New Jump"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Watch out for other skiers
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          Fill out this form.
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          Get as close to the takeoff of the jump as possible
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="email"
            fullWidth
            variant="filled"
          />
        <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="email"
            fullWidth
            multiline
            rows={4}
            variant="filled"
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleClose}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
