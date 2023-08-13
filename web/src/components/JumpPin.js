import React, { useEffect, useState } from "react";
import { Overlay, Marker } from "pigeon-maps";
import { PropTypes } from "prop-types";
import { Icon } from "@mui/material";
import { RadioButtonChecked, Place } from "@mui/icons-material";
import SkiAreaLogo from "../static/ski-resort.svg";

const JumpPin = (props) => {
  useEffect(() => {
    console.log("now props", props.x);
  }, []);

  return (
   
      <Overlay anchor={[props.x, props.y]} offset={[0, 0]}>
        <Place fontSize="large" color="primary" />
      </Overlay>
  );
};



export default JumpPin;
