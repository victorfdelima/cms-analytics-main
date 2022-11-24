import { forwardRef, useCallback, useState } from 'react';
import InputMask from 'react-input-mask';

import { TextField, TextFieldProps } from '@mui/material';

const AppTextMask = forwardRef<HTMLElement, any>(function TextMaskCustom(
  props,
  ref
) {
  const { ...other } = props;
  const [mask, setMask] = useState('(99) 99999-9999');

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
      mask={mask}
      placeholderChar={`\u2000`}
      keepCharPositions={false}
      onBlur={e => {
        if (e.target.value.replace('_', '').length === 14) {
          setMask('(99) 9999-9999');
        }
      }}
      onFocus={e => {
        if (e.target.value.replace('_', '').length === 14) {
          setMask('(99) 99999-9999');
        }
      }}
      guide={false}
    >
      {(inputProps: JSX.IntrinsicAttributes & TextFieldProps) => (
        <TextField {...inputProps} type='tel' />
      )}
    </InputMask>
  );
});

export default AppTextMask;
