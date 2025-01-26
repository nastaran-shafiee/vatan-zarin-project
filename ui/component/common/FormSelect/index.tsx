"use client";
import { Control, Controller } from "react-hook-form";
import { MenuItem, Typography } from "@mui/material";
import { ChangeEvent, useId } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import { OutLinedTextField } from "../OutLinedTextField";

interface options {
  title?: string;
  text?: string | null;
  value: string | number | boolean;
  selected?: any;
  quantity?: number;
}

interface SelectPropsTypes {
  name: string;
  options?: options[];
  placeholder?: string;
  label?: string;
  control?: Control<any, any>;
  required?: boolean;
  disabled?: boolean;
  selectedValue?: string;
  defaultValue?: any;
  defaultOnChange?: (e?: any) => void;
  IconComponent?: (e?: any) => void;
}

const FormSelect = (props: SelectPropsTypes) => {
  const id = useId();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (...event: any[]) => void
  ) => {
    const selectedValue = event.target.value;
    const selectedOption = props.options?.find(
      (option) => option.value.toString() === selectedValue
    );
    if (selectedOption) {
      props.defaultOnChange?.(selectedOption.quantity);
    }
    onChange(event);
  };

  return (
    <Controller
      control={props.control}
      name={props.name as string}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <>
          <OutLinedTextField
            required={props.required ? props.required : false}
            fullWidth
            onChange={(e) => handleChange(e, onChange)}
            value={props.disabled ? props.selectedValue : value}
            name={name}
            select
            error={!!error}
            helperText={error && error.message}
            label={props.label}
            disabled={props.disabled || false}
            defaultValue={props.defaultValue}
          >
            {props.options?.map((option) => (
              <MenuItem key={id} value={option.value.toString()}>
                <Typography variant="caption">
                  {option.title ? option.title : option.text}
                </Typography>
              </MenuItem>
            ))}
          </OutLinedTextField>
          {error && <FormHelperText> {error.message}</FormHelperText>}
        </>
      )}
    />
  );
};
export default FormSelect;
