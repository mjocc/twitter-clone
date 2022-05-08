import {
  Alert,
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import type { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useState, VoidFunctionComponent } from 'react';
import { useMutation } from 'react-query';
import { AlertCircle } from 'tabler-icons-react';
import { z } from 'zod';
import { ApiErrorResponse } from '../../lib/api';
import { logIn } from '../../lib/api/auth';
import { authFormAtom, userInfoAtom } from '../../lib/state';

interface LogInFormProps {}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username should have at least 3 characters' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
export type LogInFormValues = z.infer<typeof schema>;

const LogInForm: VoidFunctionComponent<LogInFormProps> = () => {
  const focusTrapRef = useFocusTrap();
  const [error, setError] = useState<null | string>(null);
  const closeAuthForm = useResetAtom(authFormAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);

  const form = useForm<LogInFormValues>({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      password: '',
    },
  });

  const { mutate, isLoading } = useMutation(logIn, {
    onSuccess({ data }) {
      setUserInfo(data);
      closeAuthForm();
      showNotification({
        message: `Now logged in as '${data.username}'`,
      });
    },
    onError({ response }: AxiosError<ApiErrorResponse<LogInFormValues>>) {
      if (response?.data) {
        const { data } = response;
        if (data.non_field_errors) setError(data.non_field_errors[0]);

        const fieldErrorPresent = !!(data.username || data.password);
        if (fieldErrorPresent) form.setErrors(data);

        if (!(data.non_field_errors || fieldErrorPresent))
          setError('Something went wrong. Please try again later.');
      }
    },
  });

  return (
    <Box mx="auto" px={10} ref={focusTrapRef}>
      <form onSubmit={form.onSubmit((values) => mutate(values))} noValidate>
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
        {error && (
          <Alert icon={<AlertCircle size={16} />} color="red" mt="md">
            {error}
          </Alert>
        )}
        <Group position="right" mt="md">
          <Button type="submit" loading={isLoading}>
            Log in
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default LogInForm;
