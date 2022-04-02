import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { FormEvent, VoidFunctionComponent } from 'react';
import { z } from 'zod';

interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues, event: FormEvent<Element>) => void;
}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username should have at least 3 characters' }),
  profileName: z.string(),
  emailAddress: z.string().email(),
  password: z.string(),
});
export type SignUpFormValues = z.infer<typeof schema>;

const SignUpForm: VoidFunctionComponent<SignUpFormProps> = ({ onSubmit }) => {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      profileName: '',
      emailAddress: '',
      password: '',
    },
  });

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          required
          label="Username"
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
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUpForm;
