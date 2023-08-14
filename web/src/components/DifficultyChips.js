import { Chip } from "@mui/material";
import { Circle, Square } from "@mui/icons-material";
import BlackDiamondLogo from "../static/images/blackdiamond.svg"; // TODO
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
      icon={<Square />}
      label="Expert"
      style={{ color: "black" }}
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
