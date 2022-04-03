import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import { FormEvent, VoidFunctionComponent } from 'react';
import { z } from 'zod';

interface LogInFormProps {
  onSubmit: (values: LogInFormValues, event: FormEvent<Element>) => void;
}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username should have at least 3 characters' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
export type LogInFormValues = z.infer<typeof schema>;

const LogInForm: VoidFunctionComponent<LogInFormProps> = ({ onSubmit }) => {
  const focusTrapRef = useFocusTrap();

  const form = useForm<LogInFormValues>({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
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
