import React, { useEffect, useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import useWindowDimensions from "../hooks/window";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setAreas } from "../redux/areasSlice";
import { css } from "@emotion/react";
import SkiAreaLogo from "../static/ski-resort.svg";
import areas from "../static/areas.json";
import {showError} from "../utils/notifier";

import {
  NearMe,
  Lens,
  Mail,
  Menu,
  Person,
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
  getAlertUtilityClass,
} from "@mui/material";
import AreasPopup from "./AreasPopup";
import { GoogleLogin } from "@react-oauth/google";
import { useTheme } from "@mui/material/styles";

import { UserAPI } from "../apis/userApi";
import { JumpApi } from "../apis/jumpApi";
import AreasMenu from "./AreasMenu";
import { AreaApi } from "../apis/areaApi";


export function MyMap() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [center, setCenter] = useState(areas[0].location);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [positionHover, setPositionHover] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [isAreasDialogOpen, setIsAreasDialogOpen] = useState(false);
  const theme = useTheme();
  const [zoom, setZoom] = useState(11);
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
  };

  const geoError = () => {
    alert("Unable to retrieve your location");
  };

  useEffect(() => {
    console.log('HERE WE ARE ');
    if (centerMe) {
      setCenter(myLocation);
      console.log("should set center");
      setCenterMe(false);
    }
  }, [myLocation]);

  const getJumps = () => {
    // JumpApi.list();
    // console.log("user is ", user);
  };

  const getAreas = async () => {
    try {
      const r = await AreaApi.list();
      // console.log('got areas', r);
      dispatch(setAreas(r));
    } catch (error) {
      showError("Failed to get areas");
      console.log('error fetching areas: ', error);
    }
    
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
      alert("Geolocation not supported");
    }
  };

  

  // get user's location and show that by default
  useEffect(() => {
    console.log('I should fire once');
    getPosition();
    getJumps();
    getAreas();
  }, []);

  const positionButtonStyle = {
    position: "absolute",
    right: "1rem",
    bottom: "1.5rem",
    color: "white",
    borderRadius: "4px",
    backgroundColor: positionHover
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
    width: "56px",
    height: "56px",
  };

  const myPositionButton = (
    <IconButton
      variant="contained"
      onMouseEnter={() => setPositionHover(true)}
      onMouseLeave={() => setPositionHover(false)}
      onClick={() => {
        setCenterMe(true);
        getPosition();
      }}
      style={positionButtonStyle}
    >
      <NearMe />
    </IconButton>
  );

  const menuButtonStyle = {
    position: "absolute",
    right: "1rem",
    top: "1.5rem",
    borderRadius: "4px",
    color: "white",
    width: "56px",
    height: "56px",
    backgroundColor: menuHover
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
  };

  const menuButton = (
    <IconButton
      color="primary"
      variant="contained"
      style={menuButtonStyle}
      onMouseEnter={() => setMenuHover(true)}
      onMouseLeave={() => setMenuHover(false)}
      onClick={() => {
        setIsMenuOpen(true);
      }}
    >
      <Person />
    </IconButton>
  );

  const myLocationOverlay = (
    <Overlay anchor={myLocation} offset={[0, 0]}>
      <RadioButtonChecked color="primary" />
    </Overlay>
  );

  const clickedAreas = (e) => {
    console.log("here we are", e);
    e.preventDefault();
    setIsAreasDialogOpen(true);
  };

  const getLoggedInUser = async () => {
    const u = await UserAPI.get();
    console.log("got user from api ", u);
    dispatch(setUser(u));
  };

  const notSignedInList = (
    <List>
      <ListItem key={"newjump"} disablePadding>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            localStorage.setItem("token", credentialResponse.credential);
            getLoggedInUser();
          }}
          onError={() => {
            alert("Login Failed");
          }}
          useOneTap
        />
      </ListItem>
    </List>
  );

  const list = (
    <Box role="presentation" onClick={() => setIsMenuOpen(false)}>
      <List>
        <ListItem key={"newjump"} disablePadding>
          <ListItemButton onClick={clickedAreas}>
            <ListItemIcon>
              <Terrain />
            </ListItemIcon>
            <ListItemText primary={"Areas"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {notSignedInList}
    </Box>
  );

  const menu = (
    <Drawer
      anchor="right"
      open={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
    >
      {list}
    </Drawer>
  );

  const areasMenu = (
    <AreasMenu />
  );

  const areaModalClosed = (newLoc) => {
    setIsAreasDialogOpen(false);

    if (newLoc) {
      setCenter(newLoc);
    }
  };

  const areasPopup = (
    <AreasPopup open={isAreasDialogOpen} onClose={areaModalClosed} />
  );

  return (
    <>
      <Map
        height={height}
        center={center}
        defaultCenter={center}
        defaultZoom={14}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
      >
        <Marker width={50} anchor={[50.879, 4.6997]} />
        {myLocation ? myLocationOverlay : null}
      </Map>

      {geoActive ? myPositionButton : null}
      {menu}
      {menuButton}
      {areasPopup}
      {areasMenu}
      
    </>
  );
}
