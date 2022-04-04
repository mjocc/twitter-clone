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
import { getUserInfo, logIn } from '../../lib/auth';
import { authFormAtom, authTokenAtom } from '../../lib/state';

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
  const [, setAuthToken] = useAtom(authTokenAtom);
  const [error, setError] = useState<null | string>(null);
  const closeAuthForm = useResetAtom(authFormAtom);

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
    const response = await logIn(values);
    console.log(response);
    if (response?.token) {
      setAuthToken(response.token);
      closeAuthForm();
      showNotification({
        message: `Now logged in as '${values.username}'`,
        icon: <InfoCircle />,
      });
      const userInfoResponse = await getUserInfo(values.username);
      const userInfo = userInfoResponse?.results?.[0];
      console.log(userInfo);
      //TODO: move this logic to a reusable hook or something and get rid of all console.logs
    } else if (response?.non_field_errors) {
      setError(response.non_field_errors);
    } else {
      setError('Something went wrong. Please try again.');
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
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default LogInForm;
