'use client';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

const FormCheckBox = ({ ...props }: { name: string; label?: string }) => {
  return (
    <Controller
      name={props.name as string}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} checked={field.value} />}
          label={props.label ? props.label : ''}
        />
      )}
    />
  );
};
export default FormCheckBox;
