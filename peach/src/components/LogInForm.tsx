import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { FormEvent, VoidFunctionComponent } from 'react';
import { z } from 'zod';

interface LogInFormProps {
  onSubmit: (
    values: {
      username: string;
      password: string;
    },
    event: FormEvent<Element>
  ) => void;
}

const schema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username should have at least 2 characters' }),
  password: z.string(),
});

const LogInForm: VoidFunctionComponent<LogInFormProps> = ({ onSubmit }) => {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
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

export default LogInForm;
