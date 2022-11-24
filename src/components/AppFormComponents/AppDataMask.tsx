import { forwardRef, useCallback } from 'react';
import InputMask from 'react-input-mask';

import { TextField, TextFieldProps } from '@mui/material';

const AppDataMask = forwardRef<HTMLElement, any>(function TextMaskCustom(
  props,
  ref
) {
  const { ...other } = props;

  const setRef = useCallback(
    maskedInputRef => {
      const value = maskedInputRef?.inputElement ?? null;

      if (typeof ref === `function`) {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    },
    [ref]
  );

  return (
    <InputMask
      {...other}
      ref={setRef}
      mask={'99/99/9999'}
      placeholderChar={`\u2000`}
      keepCharPositions={false}
      guide={false}
    >
      {(inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
        <TextField {...inputProps} type='tel' />
      )}
    </InputMask>
  );
});

export default AppDataMask;
