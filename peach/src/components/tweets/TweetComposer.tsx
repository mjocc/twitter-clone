import {
  Alert,
  Box,
  Button,
  Divider,
  Group,
  RingProgress,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { FormEvent, useState, VoidFunctionComponent } from 'react';
import { AlertCircle } from 'tabler-icons-react';
import { z } from 'zod';
import { createTweet } from '../../lib/api/tweet';

interface TweetComposerProps {}

const schema = z.object({
  text: z
    .string()
    .max(240, { message: 'Tweets cannot be longer than 240 characters' })
    .min(1, { message: 'Tweets must have text' }),
});
export type TweetComposerValues = z.infer<typeof schema>;

const TweetComposer: VoidFunctionComponent<TweetComposerProps> = () => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<TweetComposerValues>({
    schema: zodResolver(schema),
    initialValues: {
      text: '',
    },
  });

  const progress = (form.values.text.length / 240) * 100;
  const hasContent = progress > 0;

  const handleSubmit = async (
    values: TweetComposerValues,
    event: FormEvent<Element>
  ) => {
    setLoading(true);
    // TODO: find a way to make a user's own tweets come up in their feed
    const { response, responseData } = await createTweet(values);
    setLoading(false);
    if (response.ok) {
      form.reset()
      showNotification({
        message: 'Tweet created',
      });
    } else {
      if (responseData?.non_field_errors)
        setError(responseData.non_field_errors);
      form.setErrors(responseData);
    }
  };

  return (
    <>
      <Box mx="auto" sx={{ maxWidth: 550 }}>
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Textarea
            required
            autosize
            placeholder="What's happening?"
            aria-label="tweet composer"
            variant="unstyled"
            size="xl"
            {...form.getInputProps('text')}
          />
          {error && (
            <Alert icon={<AlertCircle size={16} />} color="red" mt="md">
              {error}
            </Alert>
          )}
          <Group position="right">
            {hasContent && (
              <RingProgress
                size={32}
                thickness={3}
                sections={[{ value: progress, color: 'blue' }]}
              />
            )}
            <Button
              type="submit"
              loaderProps={{ variant: 'oval' }}
              loading={loading}
              disabled={!hasContent}
            >
              Tweet
            </Button>
          </Group>
        </form>
        <Divider my="md" />
      </Box>
    </>
  );
};

export default TweetComposer;
