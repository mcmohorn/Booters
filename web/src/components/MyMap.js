import React, { useEffect, useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import useWindowDimensions from "../hooks/window";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setJumps } from "../redux/jumpsSlice";
import { setAreas } from "../redux/areasSlice";
import SkiAreaLogo from "../static/ski-resort.svg";
import areas from "../static/areas.json";
import { showError } from "../utils/notifier";
import { ClickAwayListener } from "@mui/base";

import {
  NearMe,
  Person,
  RadioButtonChecked,
  Place,
  Flag,
} from "@mui/icons-material";
import {
  IconButton,
  Card,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Drawer,
  Paper,
  Rating,
  Box,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useTheme } from "@mui/material/styles";

import { EasyChip, MediumChip, HardChip } from "./DifficultyChips";

import { UserAPI } from "../apis/userApi";
import { JumpApi } from "../apis/jumpApi";
import AreasMenu from "./AreasMenu";
import { AreaApi } from "../apis/areaApi";

export function MyMap() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const currentArea = useSelector((state) => state.areas.current);
  const jumps = useSelector((state) => state.jumps.list);
  const [center, setCenter] = useState(areas[0].location);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [positionHover, setPositionHover] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [focusedJump, setFocusedJump] = useState(null);
  const [hoveredJump, setHoveredJump] = useState(null);
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

  // center map on user's location when indicated
  // effect fires when location access granted, then my location is pressed
  useEffect(() => {
    if (centerMe) {
      // when button is pressed
      setCenter(myLocation);
      setCenterMe(false);
    }
  }, [myLocation]);

  // jump to selected area's center
  useEffect(() => {
    if (currentArea.latitude && currentArea.longitude) {
      const loc = [currentArea.latitude, currentArea.longitude];
      setCenter(loc);
      console.log("we should jump to a new area", currentArea);
    }
  }, [currentArea]);

  const getJumps = async () => {
    try {
      const r = await JumpApi.list();

      dispatch(setJumps(r));
    } catch (error) {
      showError("Failed to get jumps");
      console.log("error fetching jumps: ", error);
    }
    // console.log("user is ", user);
  };

  const getAreas = async () => {
    try {
      const r = await AreaApi.list();
      dispatch(setAreas(r));
    } catch (error) {
      showError("Failed to get areas");
      console.log("error fetching areas: ", error);
    }
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
      alert("Geolocation not supported");
    }
  };

  useEffect(() => {
    // get user's location if allowed
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

  const getLoggedInUser = async () => {
    const u = await UserAPI.get();
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

  const areasMenu = <AreasMenu />;

  const jumpPins = jumps.map((j) => {
    return (
      <Overlay
        key={j.id}
        onClick={() => {
          setCenter([j.latitude, j.longitude]);
          setFocusedJump(j);
        }}
        anchor={[j.latitude, j.longitude]}
        offset={[0, 0]}
      >
        <Flag
          color={hoveredJump == j.id ? "primary" : "secondary"}
          onMouseEnter={() => setHoveredJump(j.id)}
          onMouseLeave={() => setHoveredJump(null)}
          onClick={() => {
            setCenter([j.latitude, j.longitude]);
            setFocusedJump(j);
          }}
        />
      </Overlay>
    );
  });

  const focusedJumpOverlay = focusedJump ? (
    <Overlay
      anchor={[focusedJump.latitude, focusedJump.longitude]}
      offset={[0, 0]}
    >
      <ClickAwayListener onClickAway={() => setFocusedJump(null)}>
        <Card sx={{ maxWidth: width / 2 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/images/ski-default.jpg"
            title="green iguana"
          />
          <CardContent>
          <Typography
              gutterBottom
              component="div"
              style={{ textAlign: "right" }}
            >
              <HardChip />
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ textAlign: "left" }}
            >
              {focusedJump.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {focusedJump.description}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="report a problem">
              <Flag />
            </IconButton>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </ClickAwayListener>
    </Overlay>
  ) : null;


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
        {myLocation ? myLocationOverlay : null}
        {jumpPins}
      </Map>

      {geoActive ? myPositionButton : null}
      {menu}
      {focusedJumpOverlay}
      {menuButton}
      {areasMenu}
    </>
  );
}
