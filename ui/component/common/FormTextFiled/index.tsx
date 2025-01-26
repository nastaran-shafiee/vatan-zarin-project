"use client";
import { Controller } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
import { digitsFaToEn, addCommas } from "@persian-tools/persian-tools";
import { OutLinedTextField } from "#/ui/component/common/OutLinedTextField";

type extendedTextfield = TextFieldProps & {
  money?: boolean;
  maxLength?: number;
};

const FormInputText = ({ ...props }: extendedTextfield) => {
  return (
    <Controller
      name={props.name as string}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => {
        return (
          <OutLinedTextField
            type="text"
            {...props}
            helperText={error && value && error.message}
            size="small"
            error={!!error}
            onChange={
              props.money
                ? (e) =>
                    !isNaN(
                      Number(digitsFaToEn(e.target.value.replaceAll(",", "")))
                    ) &&
                    onChange(digitsFaToEn(e.target.value.replaceAll(",", "")))
                : (e) => onChange(digitsFaToEn(e.target.value))
            }
            value={props.money ? addCommas(value) : value}
            fullWidth
            name={name}
            variant="outlined"
            inputProps={{
              maxLength: props.maxLength,
            }}
          />
        );
      }}
    />
  );
};
export default FormInputText;
