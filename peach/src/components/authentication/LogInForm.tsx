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
import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { FormEvent, useState, VoidFunctionComponent } from 'react';
import { AlertCircle, InfoCircle } from 'tabler-icons-react';
import { z } from 'zod';
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
  const [loading, setLoading] = useState(false);
  const closeAuthForm = useResetAtom(authFormAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);

  const form = useForm<LogInFormValues>({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (
    values: LogInFormValues,
    event: FormEvent<Element>
  ) => {
    setLoading(true);
    const { response, responseData } = await logIn(values);
    setLoading(false);
    if (response.ok && responseData?.loggedIn) {
      setUserInfo(responseData);
      closeAuthForm();
      showNotification({
        message: `Now logged in as '${values.username}'`,
        icon: <InfoCircle />,
      });
    } else {
      if (responseData?.non_field_errors)
        setError(responseData.non_field_errors);
      form.setErrors(responseData);
    }
  };

  return (
    <Box mx="auto" px={10} ref={focusTrapRef}>
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
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
          <Button
            type="submit"
            loaderProps={{ variant: 'oval' }}
            loading={loading}
          >
            Log in
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default LogInForm;
