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
import { logIn, signUp } from '../../lib/api/auth';
import { authFormAtom, userInfoAtom } from '../../lib/state';
import PasswordStrengthInput, { requirements } from './PasswordStrengthInput';

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
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (
    values: SignUpFormValues,
    event: FormEvent<Element>
  ) => {
    setLoading(true);
    const signUpRep = await signUp(values);
    if (signUpRep.response.ok) {
      const { response, responseData } = await logIn(values);
      setLoading(false);
      if (response.ok && responseData?.loggedIn) {
        setUserInfo(responseData);
        closeAuthForm();
        showNotification({
          message: `Now logged in as '${values.username}'`,
        });
      } else if (responseData?.non_field_errors) {
        setError(responseData.non_field_errors);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } else {
      setLoading(false);
      if (signUpRep.responseData?.non_field_errors)
        setError(signUpRep.responseData.non_field_errors);
      form.setErrors(signUpRep.responseData);
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
            loaderProps={{ variant: 'oval' }}
            loading={loading}
          >
            Sign up
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUpForm;
