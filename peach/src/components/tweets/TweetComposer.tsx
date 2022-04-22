import {
  Alert,
  Box,
  Button,
  Divider,
  Group,
  RingProgress,
  Textarea,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { FormEvent, useState, VoidFunctionComponent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
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

  const form = useForm<TweetComposerValues>({
    schema: zodResolver(schema),
    initialValues: {
      text: '',
    },
  });

  const progress = (form.values.text.length / 240) * 100;
  const hasContent = progress > 0;

  const { invalidateQueries } = useQueryClient();
  const { mutate, isLoading } = useMutation(createTweet, {
    //! // FIXME: onsuccess not working
    onSuccess() {
      invalidateQueries('/tweets');
      form.reset();
      showNotification({
        message: 'Tweet created',
      });
    },
    onError({ responseData }) {
      if (responseData?.non_field_errors)
        setError(responseData.non_field_errors);
      if (responseData) {
        form.setErrors(responseData);
      }
    },
  });

  return (
    <>
      <Box mx="auto" sx={{ maxWidth: 550 }}>
        <form onSubmit={form.onSubmit((values) => mutate(values))} noValidate>
          <Textarea
            required
            autosize
            placeholder="What's happening?"
            aria-label="tweet composer"
            variant="unstyled"
            size="xl"
            maxLength={240}
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
              loading={isLoading}
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