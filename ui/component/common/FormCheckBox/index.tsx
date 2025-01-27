'use client';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

const FormCheckBox = ({ ...props }: { name: string; label?: string }) => {
  return (
    <Controller
      name={props.name as string}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value}
              sx={{
                borderRadius: '8px', // تنظیم Border Radius چک‌باکس
                padding: 0, // تنظیم فاصله داخلی چک‌باکس
              }}
            />
          }
          label={props.label ? props.label : ''}
          sx={{
            gap: '8px', // فاصله بین چک‌باکس و لیبل
          }}
        />
      )}
    />
  );
};
export default FormCheckBox;
