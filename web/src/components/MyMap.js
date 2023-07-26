import React, { useEffect, useState } from "react"
import { Map, Marker, Overlay } from "pigeon-maps"
import useWindowDimensions from "../hooks/window";

import { css } from '@emotion/react'
const parkCity = [40.633094, -111.515027];
const jackson = [40.633094, -111.515027];
import { NearMe, Lens, Mail, Menu } from '@mui/icons-material';
import { Button, IconButton, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";

export function MyMap() {
    const [center, setCenter] = useState(parkCity);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [zoom, setZoom] = useState(11)
    const [geoActive, setGeoActive] = useState(false);
    const [myLocation, setMyLocation] = useState(null);
    const [centerMe, setCenterMe] = useState(false);
    const { height, width } = useWindowDimensions();
    const geoSuccess = (position) => {
        setGeoActive(true);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setMyLocation([latitude, longitude]);
    }
        
    const geoError = () => {
        alert("Unable to retrieve your location");
    }

    useEffect(() => {
      if (centerMe) {
        setCenter(myLocation);
        console.log('should set center');
        setCenterMe(false);
      }
    }, [myLocation]);

    const getPosition = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
      } else {
          alert("Geolocation not supported");
      }
    };

    // get user's location and show that by default
    useEffect(() => {
        getPosition();
    }, []);

    

    const myPositionButton = (
      <Button 
        style={{ position: 'absolute', right: '1rem', bottom: '1.5rem' }}
        variant="contained" 
        onClick={() => {
          setCenterMe(true);
          getPosition();
        }}>
          <IconButton style={{color: 'white'}}><NearMe/></IconButton>
    </Button>
    );

    

    const menuButton = (
      <Button
          onClick={() => {
            setIsMenuOpen(true) 
          }}
          color="primary"
          style={{ 
        position: 'absolute', left: '1rem', top: '1.5rem' }}
          
          variant="contained">
            
            
            <IconButton style={{color: 'white'}}><Menu /></IconButton>
          </Button>
    );

    const myLocationOverlay = (
      <Overlay anchor={myLocation} offset={[0,0]}>
        <Lens color="primary" />
      </Overlay>
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
                   <Mail />
                </ListItemIcon>
                <ListItemText primary={"Create Jump"} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
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
    <Map height={height} center= {center} defaultCenter={center} defaultZoom={14} onBoundsChanged={({ center, zoom }) => { 
      setCenter(center) 
      setZoom(zoom) 
    }} >
      
      <Marker width={50} anchor={[50.879, 4.6997]} />
      {myLocation ? myLocationOverlay : null}
      {geoActive ? myPositionButton : null}
      {menu}
      {menuButton}
    </Map>
  )
}