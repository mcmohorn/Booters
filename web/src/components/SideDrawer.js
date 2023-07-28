import React, { useEffect, useState } from "react"
import { Map, Marker, Overlay } from "pigeon-maps"
import useWindowDimensions from "../hooks/window";

import { css } from '@emotion/react';
import SkiAreaLogo from '../static/ski-resort.svg';
const parkCity = [40.633094, -111.515027];
const jackson = [40.633094, -111.515027];
import { NearMe, Lens, Mail, Menu, RadioButtonChecked, Terrain } from '@mui/icons-material';
import { Button, IconButton, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";

export function SideDrawer() {
    const [center, setCenter] = useState(parkCity);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const signedInUserList = (
      <List>
            <ListItem key={"newjump"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                   <Mail />
                </ListItemIcon>
                <ListItemText primary={"Create Jump"} />
              </ListItemButton>
            </ListItem>
        </List>
    );

    const list = (
      <Box
        role="presentation"
        onClick={() => setIsMenuOpen(false)}
      >
        <List>
            <ListItem key={"newjump"} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Terrain />
                </ListItemIcon>
                <ListItemText primary={"Areas"} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        {signedInUserList}
        
      </Box>
    );



    const menu = (
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        {list}
      </Drawer>
    );
    
  return (
    
      
     
      {menu}

  )
}