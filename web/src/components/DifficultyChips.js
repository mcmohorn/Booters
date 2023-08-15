import { Chip } from "@mui/material";
import { Circle, Square } from "@mui/icons-material";
import {ReactComponent as BlackDiamondLogo} from "../static/images/diamond.inline.svg";
import constants from "../static/constants.json";

const EasyChip = () => {
  return (
    <Chip icon={<Circle />} label="Easy" color="success" variant="outlined" />
  );
};

const MediumChip = () => {
  return (
    <Chip
      icon={<Square />}
      label="Intermediate"
      color="primary"
      variant="outlined"
    />
  );
};

const HardChip = () => {
  return (
    <Chip
      icon={<BlackDiamondLogo />}
      label="Expert"
      style={{ width: 50, color: "black" }}
    />
  );
};

const getChipForDifficulty = (diff) => {
  if (diff == constants.difficulty.easy) {
    return EasyChip();
  } else if (diff == constants.difficulty.medium) {
    return MediumChip();
  } else {
    return HardChip();
  }
};

export { EasyChip, MediumChip, HardChip, getChipForDifficulty };
