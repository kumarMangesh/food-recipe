import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";

const Filters = ({ filterState, handleFilterChange }) => {
  const [filter, setFilter] = useState(filterState);

  useEffect(() => {
    setFilter({ ...filterState });
  }, [filterState]);

  return (
    <>
      <div style={{ display: "flex" }}>
        {Object.keys(filter).map((filterKey, index) => (
          <div key={index}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">
                {filter[filterKey].placeholder}
              </InputLabel>
              <Select
                value={filter[filterKey].value}
                label={filter[filterKey].placeholder}
                onChange={(e, value) => handleFilterChange(e, value, filterKey)}
                size="small"
              >
                {filter[filterKey].options.map((option, optionKey) => (
                  <MenuItem value={option.value} key={optionKey}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}
      </div>
    </>
  );
};

export default Filters;
