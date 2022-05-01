import {
  Alert,
  Box,
  Button,
  Group, TextInput
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useFocusTrap } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useState, VoidFunctionComponent } from 'react';
import { useMutation } from 'react-query';
import { AlertCircle } from 'tabler-icons-react';
import { z } from 'zod';
import { logIn, signUp } from '../../lib/api/auth';
import { authFormAtom, userInfoAtom } from '../../lib/state';
import PasswordStrengthInput from './PasswordStrengthInput';

interface SignUpFormProps {}

const schema = z.object({
  username: z
    .string()
    .max(150, { message: 'Username cannot be more than 150 characters' })
    .min(3, { message: 'Username should have at least 3 characters' }),
  profile_name: z.string().min(1, { message: 'Profile name is required' }),
  email: z
    .string()
    .email('Invalid email address')
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
      message: 'Password must include a special character',
    })
    .regex(/[A-Z]/, { message: 'Password must include an uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must include a lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must include a number' })
    .min(6, { message: 'Password must have at least 6 characters' }),
});
export type SignUpFormValues = z.infer<typeof schema>;

const SignUpForm: VoidFunctionComponent<SignUpFormProps> = () => {
  const focusTrapRef = useFocusTrap();
  const [error, setError] = useState<null | string>(null);
  const closeAuthForm = useResetAtom(authFormAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);

  const form = useForm<SignUpFormValues>({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      profile_name: '',
      email: '',
      password: '',
    },
  });

  const logInMutation = useMutation(logIn, {
    onSuccess({ data }) {
      setUserInfo(data);
      closeAuthForm();
      showNotification({
        message: `Now logged in as '${data.username}'`,
      });
    },
    onError({
      response,
    }: AxiosError<{
      username?: string[];
      password?: string[];
      non_field_errors?: string[];
    }>) {
      if (response?.data) {
        const { data } = response;
        if (data?.non_field_errors) setError(data.non_field_errors[0]);
        else setError('Something went wrong. Please try again.');
      }
    },
  });

  const signUpMutation = useMutation(signUp, {
    onSuccess({ data }) {
      logInMutation.mutate({
        username: data.username,
        password: form.values.password,
      });
    },
    onError({
      response,
    }: AxiosError<{
      username?: string[];
      profile_name?: string[];
      email?: string[];
      password?: string[];
      non_field_errors?: string[];
    }>) {
      if (response?.data) {
        const { data } = response;
        if (data?.non_field_errors) setError(data.non_field_errors[0]);
        if (data?.username || data?.password) form.setErrors(data);
        if (!(data?.non_field_errors || data?.username || data?.password))
          setError('Something went wrong. Please try again.');
      }
    },
  });

  const isLoading = logInMutation.isLoading || signUpMutation.isLoading;

  return (
    <Box mx="auto" px={10} ref={focusTrapRef}>
      <form
        onSubmit={form.onSubmit((values) => signUpMutation.mutate(values))}
        noValidate
      >
        <TextInput
          required
          label="Username"
          data-autofocus
          {...form.getInputProps('username')}
        />
        <TextInput
          required
          label="Profile name"
          {...form.getInputProps('profile_name')}
        />
        <TextInput
          required
          label="Email"
          type="email"
          {...form.getInputProps('email')}
        />
        <PasswordStrengthInput
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
            loading={isLoading}
          >
            Sign up
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUpForm;
