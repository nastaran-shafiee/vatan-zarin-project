import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';
import { RadioGroupProps } from '@mui/material/RadioGroup/RadioGroup';
import { FormControlLabelProps } from '@mui/material/FormControlLabel/FormControlLabel';

type RadioItem = Partial<FormControlLabelProps>;

type RadioButtonPropsType = {
  defaultValue: any;
  name: string;
  items: RadioItem[];
  otherProps?: RadioGroupProps;
};

const RadioButton = (props: RadioButtonPropsType) => {
  return (
    <Controller
      name={props.name}
      render={({ field }) => (
        <RadioGroup
          {...props.otherProps}
          defaultValue={props.defaultValue}
          name={props.name}
          onChange={(e) => {
            field.onChange(e);
          }}
        >
          {props.items.map((item) => (
            <FormControlLabel
              value={item.value}
              control={<Radio />}
              label={item.label}
              {...props.items}
              key={item.id}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};
export default RadioButton;
