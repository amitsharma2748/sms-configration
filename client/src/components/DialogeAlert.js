import { Button, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import React, { useState } from 'react'

const DialogeAlert = () => {
    const [open, setOpen] = useState(false);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };
      
  return (
    <div>
          <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"This will update the values for every category!  Are you sure want to confirm?"}</DialogTitle>
      
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleUpdate}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogeAlert