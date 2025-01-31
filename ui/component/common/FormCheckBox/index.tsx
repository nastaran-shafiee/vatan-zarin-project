'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

const FormCheckBox = ({ name, label, defaultChecked }: { name: string; label?: string ,defaultChecked?:string|boolean}) => {
  const { control } = useFormContext(); // دریافت کنترل فرم

  return (
    <Controller
      name={name}
      defaultValue={defaultChecked || false} // تنظیم مقدار پیش‌فرض
      control={control} // اتصال به فرم
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={Boolean(field.value)} // تبدیل مقدار به بولین
              onChange={(e) => field.onChange(e.target.checked)} // مقدار را به درستی آپدیت کن
              sx={{
                borderRadius: '8px',
                padding: 0,
              }}
            />
          }
          label={label || ''}
          sx={{
            gap: '8px',
          }}
        />
      )}
    />
  );
};

export default FormCheckBox;

