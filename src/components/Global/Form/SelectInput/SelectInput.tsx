import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { getNestedError } from "../TextInput/TextInput";

import styles from "../Form.module.css";

interface SelectInputProps extends SelectProps {
  name: string;
  label: string;
  options: {
    value: any;
    label: string;
  }[];
  showEmpty?: boolean;
}

export const SelectInput = ({ name, label, showEmpty = false, ...props }: SelectInputProps) => {
  const { register, formState } = useFormContext();
  const error = getNestedError(formState.errors, name);

  const items = props.options.map((option, i) => (
    <MenuItem key={i} value={option.value}>
      {option.label}
    </MenuItem>
  ));

  if (props.displayEmpty) {
    items.unshift(<MenuItem value={undefined}>Choose a media type</MenuItem>);
  }
  return (
    <div className={styles.text_input}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select labelId={`${name}-label`} fullWidth label={label} variant="outlined" {...register(name)} error={error !== undefined} {...props}>
          {items}
        </Select>
      </FormControl>
    </div>
  );
};
