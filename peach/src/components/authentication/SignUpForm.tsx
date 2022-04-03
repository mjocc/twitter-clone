import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import { FormEvent, VoidFunctionComponent } from 'react';
import { z } from 'zod';

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues, event: FormEvent<Element>) => void;
}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username should have at least 3 characters' }),
  profileName: z.string().min(1, { message: 'Password is required' }),
  emailAddress: z
    .string()
    .email('Invalid email address')
    .min(1, { message: 'Email is required' }),
  confirmEmailAddress: z
    .string()
    .email('Invalid email address')
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
export type SignUpFormValues = z.infer<typeof schema>;

const SignUpForm: VoidFunctionComponent<SignUpFormProps> = ({ onSubmit }) => {
  const focusTrapRef = useFocusTrap();

  const form = useForm<SignUpFormValues>({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      profileName: '',
      emailAddress: '',
      confirmEmailAddress: '',
      password: '',
    },
  });

  return (
    <Box mx="auto" px={10} ref={focusTrapRef}>
      <form onSubmit={form.onSubmit(onSubmit)} noValidate>
        <TextInput
          required
          label="Username"
          data-autofocus
          {...form.getInputProps('username')}
        />
        <TextInput
          required
          label="Profile name"
          {...form.getInputProps('profileName')}
        />
        <TextInput
          required
          label="Email"
          type="email"
          {...form.getInputProps('emailAddress')}
        />
        <TextInput
          required
          label="Confirm email"
          type="email"
          {...form.getInputProps('confirmEmailAddress')}
        />
        <PasswordInput
          required
          label="Password"
          {...form.getInputProps('password')}
        />
        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUpForm;
