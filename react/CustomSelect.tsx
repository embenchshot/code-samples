import { Controller, Control, FieldValues } from 'react-hook-form';
import styled from 'styled-components';

import {
  TextField,
  FormControl,
  FormHelperText,
  AutocompleteRenderInputParams,
} from '@mui/material';
import { Autocomplete } from '@mui/material';

import { convertSelectOption } from 'utils/utils';

interface SelectProps {
  data: Array<Record<string, any>>;
  fieldName: string;
  label: string;
  error: { message: string };
  control: Control<FieldValues>;
  icon?: React.ReactNode;
  placeholder?: string;
  notRequired?: boolean;
}

const Select = ({
  data = [],
  fieldName,
  label,
  error,
  control,
  icon = null,
  placeholder,
  notRequired,
  ...rest
}: SelectProps) => (
  <Wrapper>
    <IconWrap>{icon}</IconWrap>
    <FormControl variant="filled" fullWidth margin="dense">
      <Controller
        name={fieldName}
        control={control}
        rules={!notRequired ? { required: 'Required' } : {}}
        defaultValue={null}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            fullWidth
            autoHighlight
            openOnFocus
            options={data}
            value={value}
            onChange={(event, options) => onChange(options)}
            getOptionLabel={(option) => convertSelectOption(option)}
            isOptionEqualToValue={(option, value) =>
              option.db_id === value.db_id
            }
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <></>, //show the placeholder
                }}
                label={label}
                variant="filled"
                margin="dense"
                placeholder={placeholder}
              />
            )}
          />
        )}
        {...rest}
      />
      <FormHelperText>{error && error.message}</FormHelperText>
    </FormControl>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const IconWrap = styled.div`
  display: flex;
  width: 43px;
  color: ${({ theme: { colors } }) => colors.black};
`;

export default Select;