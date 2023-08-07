import * as React from "react";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";

import MenuItem from "@mui/material/MenuItem";
import Landscape from "@mui/icons-material/Landscape";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;

export default function AreasMenu() {
  const [menuHover, setMenuHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const open = Boolean(anchorEl);

  const areas = useSelector((state) => state.areas);

  const [options, setOptions] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    console.log("SELECTED ITEM", e);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (areas && areas.list) {
      setOptions(areas.list);
    }
  }, [areas]);

  const areaButtonStyle = {
    position: "absolute",
    left: "1rem",
    top: "1.5rem",
    borderRadius: "4px",
    color: "white",
    width: "56px",
    height: "56px",
    backgroundColor: menuHover
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
  };

  return (
    <div>
      <IconButton
        style={areaButtonStyle}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseEnter={() => setMenuHover(true)}
        onMouseLeave={() => setMenuHover(false)}
      >
        <Landscape />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.id}
            selected={option === "Pyxis"}
            onClick={() => handleClose(option.id)}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
