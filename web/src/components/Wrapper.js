import React, { useEffect, useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import useWindowDimensions from "../hooks/window";

import { css } from "@emotion/react";
import SkiAreaLogo from "../static/ski-resort.svg";

import { MyMap } from "./MyMap";
import { SideDrawer } from "./SideDrawer";
const parkCity = [40.633094, -111.515027];
const jackson = [40.633094, -111.515027];
import {
  NearMe,
  Lens,
  Mail,
  Menu,
  RadioButtonChecked,
  Terrain,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

export function Wrapper() {
  return (
    <div>
      <MyMap />
      <SideDrawer />
    </div>
  );
}
