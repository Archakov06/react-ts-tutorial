import React from 'react';

type InputProps = {
  value?: string | number;
  placeholder?: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
};

export const Input: React.FC<InputProps> = ({ autoFocus, placeholder, label, onChange }) => {
  const [_value, setValue] = React.useState<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  React.useEffect(() => {
    if (autoFocus) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, []);

  return (
    <div>
      <span>{label}</span>
      <input ref={inputRef} onChange={handleChangeInput} value={_value} placeholder={placeholder} />
      <button>X</button>
    </div>
  );
};
