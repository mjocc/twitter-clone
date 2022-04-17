import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import { FormEvent, VoidFunctionComponent } from 'react';
import { z } from 'zod';

interface SignUpFormProps {}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username should have at least 3 characters' }),
  profileName: z.string().min(1, { message: 'Profile name is required' }),
  emailAddress: z
    .string()
    .email('Invalid email address')
    .min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
export type SignUpFormValues = z.infer<typeof schema>;

const SignUpForm: VoidFunctionComponent<SignUpFormProps> = () => {
  const focusTrapRef = useFocusTrap();

  const form = useForm<SignUpFormValues>({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      profileName: '',
      emailAddress: '',
      password: '',
    },
  });
  // TODO: implement in similar way to LogInForm
  const handleSubmit = (
    values: SignUpFormValues,
    event: FormEvent<Element>
  ) => {};

  return (
    <Box mx="auto" px={10} ref={focusTrapRef}>
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
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
        <PasswordInput
          required
          label="Password"
          {...form.getInputProps('password')}
        />
        <Group position="right" mt="xl">
          <Button type="submit">Sign up</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUpForm;
