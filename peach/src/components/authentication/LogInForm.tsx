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
// TODO: most of this is reusable between auth forms - combine into one generic component?
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

  const handleSubmit = async (
    values: LogInFormValues,
    event: FormEvent<Element>
  ) => {
    const { responseData } = await logIn(values);
    if (responseData?.loggedIn) {
      setUserInfo(responseData);
      closeAuthForm();
      showNotification({
        message: `Now logged in as '${values.username}'`,
        icon: <InfoCircle />,
      });
      //TODO: move this logic to a reusable hook or something?
    } else if (responseData?.non_field_errors) {
      setError(responseData.non_field_errors);
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
          {/* // TODO: add loading spinner while processing */}
        </Group>
      </form>
    </Box>
  );
};

export default LogInForm;
