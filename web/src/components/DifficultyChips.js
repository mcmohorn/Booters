import { Chip } from "@mui/material";
import { Circle, Square } from "@mui/icons-material";
import BlackDiamondLogo from "../static/images/blackdiamond.svg"

const EasyChip = () => {
    return (
        <Chip icon={<Circle />} label="Easy" color="success" variant="outlined"/>
    )
};

const MediumChip = () => {
    return (
        <Chip icon={<Square />} label="Intermediate" color="primary" variant="outlined"/>
    )
};

const HardChip = () => {
    return (
        <Chip icon={<Square />} label="Expert" style={{color: 'black'}}  variant="outlined"/>
    )
};

export {
    EasyChip,
    MediumChip,
    HardChip
}