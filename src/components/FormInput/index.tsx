import React from "react";
import { INPUT_TYPE } from "@/src/config/constants";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectInput = (props) => {
  const { options, label, minWidth } = props;
  const selectStyle = {
    maxHeight: "40px",
  };
  return (
    <Box sx={{ minWidth: minWidth, padding: 0 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
        <Select
          style={{
            padding: 0,
          }}
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          {...props}>
          {options &&
            options.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export { SelectInput };
