import React from "react";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SA from "../../images/sa.svg"
import US from "../../images/us.svg"
import GB from "../../images/gb.svg"
import FR from "../../images/fr.svg"

const countryOptions = [
  { code: "sa", label: "RSA", flag: RSA },
  { code: "us", label: "USA", flag:  US },
  { code: "gb", label: "UK", flag: GB },
  { code: "fr", label: "France", flag: FR },
  
];

const useStyles = makeStyles(() => ({
  flagIcon_product: {
    width: 15,
    height: 15,
    alignSelf: "center",
    paddingRight: "1px",
  },
  countryName_product: {
    fontSize: 12,
    color: "#F5F5F5",
    alignSelf: "center",
    fontFamily: "Roboto",
    marginLeft: 5,
  },
  menuItem_product: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
    ":hover": {
      backgroundColor: "#e30605 !important",
    },
  },

  customSelect: {
    display: "flex",
    alignItems: "center",
    border: "none",
    outline: "none",
    height: 20,

    width: "auto",
    "& .MuiSelect-icon": {
      color: "white",
    },
  },
}));

const FlagSelect = ({ value = "in", onChange }) => {
  const classes = useStyles();

  const handleImageError = (event) => {
    event.target.src = "#";
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      className={classes.customSelect} 
    >
      {countryOptions.map((option) => (
        <MenuItem
          key={option.code}
          value={option.code}
          className={classes.menuItem_product}
        >
          <img
            src={option.flag}
            alt={`${option.label} flag`}
            className={classes.flagIcon_product}
            onError={handleImageError}
          />
          <span className={classes.countryName_product}>{option.label}</span>
        </MenuItem>
      ))}
    </Select>
  );
};

export default FlagSelect;

