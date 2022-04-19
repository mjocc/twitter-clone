import { RefAttributes, useState, VoidFunctionComponent } from 'react';
import {
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
  PasswordInputProps,
} from '@mantine/core';
import { Check, X } from 'tabler-icons-react';

const PasswordRequirement: VoidFunctionComponent<{
  meets: boolean;
  label: string;
}> = ({ meets, label }) => {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <Check /> : <X />} <Box ml={10}>{label}</Box>
    </Text>
  );
};

export const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special character' },
];

const getStrength = (password: string) => {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

type PasswordStrengthInputProps = PasswordInputProps &
  RefAttributes<HTMLInputElement>;

const PasswordStrengthInput: VoidFunctionComponent<
  PasswordStrengthInputProps
> = (inputProps) => {
  const { value } = inputProps as { value: string };
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      placement="start"
      withArrow
      styles={{ root: { width: '100%' }, popover: { width: '100%' } }}
      trapFocus={false}
      transition="pop-top-left"
      onFocusCapture={() => setPopoverOpened(true)}
      onBlurCapture={() => setPopoverOpened(false)}
      target={<PasswordInput {...inputProps} />}
    >
      <Progress
        color={color}
        value={strength}
        size={5}
        style={{ marginBottom: 10 }}
      />
      <PasswordRequirement
        label="Includes at least 6 characters"
        meets={value.length > 5}
      />
      {checks}
    </Popover>
  );
};

export default PasswordStrengthInput;
