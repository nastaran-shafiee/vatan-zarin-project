'use client';
import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

interface options {
  label: string;
  text?: string | null;
  value: string | number;
  selected?: any;
}
interface SelectPropsTypes {
  name: string;
  options?: options[];
  label?: string;
  control: Control<any, any>;
}

const FormRadioButton = (props: SelectPropsTypes) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <FormControl error={!!error?.message}>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <RadioGroup name={name} onChange={onChange} value={value}>
            {props?.options?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
            <FormHelperText>{error?.message}</FormHelperText>
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};
export default FormRadioButton;
