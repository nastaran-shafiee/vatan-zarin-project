'use client';
import { Controller } from 'react-hook-form';
import { Box, MenuItem, styled } from '@mui/material';

import { OutLinedTextField } from '../InputComp';

interface options {
  text: string;
  value: string | number;
}
interface SelectPropsTypes {
  name: string;
  options: options[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

const DeliveryDateSelect = ({ ...props }: SelectPropsTypes) => {
  return (
    <StyledBox>
      <Controller
        name={props.name}
        rules={{ required: props.required || false }}
        render={({
          field: { onChange, value, name },
          fieldState: { error },
        }) => (
          <OutLinedTextField
            fullWidth
            onChange={onChange}
            value={value}
            name={name}
            select
            error={!!error}
            helperText={error && error.message}
            label={props.label}
            disabled={props.disabled}
          >
            {props?.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </OutLinedTextField>
        )}
      />
    </StyledBox>
  );
};
export default DeliveryDateSelect;
const StyledBox = styled(Box)({
  width: '100%',
  gap: 15,
  justifyContent: 'center',
  flexDirection: 'row',
  padding: 15,
});
