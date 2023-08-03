"use client";

import { FormControl } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { getNestedError } from "../TextInput/TextInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import nl from "date-fns/locale/nl";

import styles from "../Form.module.css";

interface DateInputProps {
  name: string;
  label: string;
}

export const DateInput = ({ name, label, ...props }: DateInputProps) => {
  const { register, formState } = useFormContext();
  const error = getNestedError(formState.errors, name);

  return (
    <div className={styles.text_input}>
      <FormControl fullWidth>
        <Controller
          {...register(name)}
          render={({ field: { onChange, ...restField } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={nl}>
              <DatePicker
                label={label}
                onChange={(event) => {
                  onChange(event);
                }}
                {...restField}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
    </div>
  );
};
