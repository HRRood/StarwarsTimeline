import { BaseTextFieldProps, TextField } from "@mui/material";
import { FieldError, FieldErrors, useFormContext } from "react-hook-form";
import { styled } from "styled-components";

interface TextInputProps extends BaseTextFieldProps {
  name: string;
  label: string;
}

export const SmallError = styled.small`
  color: red;
`;

const getNestedError = (errors: FieldErrors, name: string): FieldError => {
  const properties = name.split(".");
  let error: FieldError | FieldErrors = errors;

  for (const property of properties) {
    // @ts-ignore
    error = error?.[property];
  }

  return error as FieldError;
};

export const TextInput = ({ name, label, ...props }: TextInputProps) => {
  const { register, formState } = useFormContext();
  const error = getNestedError(formState.errors, name);
  return (
    <div className="text-input">
      <TextField fullWidth label={label} {...register(name)} variant="standard" error={error !== undefined} helperText={error?.message} {...props} />
    </div>
  );
};
