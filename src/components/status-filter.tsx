import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const Status: React.FC<Props> = ({ onChange, value }: Props) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        value={value}
      >
        <FormControlLabel value="" control={<Radio />} label="All" />
        <FormControlLabel value="alive" control={<Radio />} label="Alive" />
        <FormControlLabel value="dead" control={<Radio />} label="Dead" />
        <FormControlLabel value="unknown" control={<Radio />} label="Unkown" />
      </RadioGroup>
    </FormControl>
  );
};

export default Status;
