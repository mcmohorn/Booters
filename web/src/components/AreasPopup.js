import React from "react";
import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemAvatar, ListItemText } from "@mui/material";
import areas from '../static/areas.json';


export default function AreasPopup (props) {

    const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

    return (
        <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Jump to area</DialogTitle>
      <List sx={{ pt: 0 }}>
        {areas.map((area, index) => (
          <ListItem disableGutters key={`area_${index}`}>
            <ListItemButton onClick={() => handleListItemClick(area.location)} key={area.name}>
              <ListItemText primary={area.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
    )
}