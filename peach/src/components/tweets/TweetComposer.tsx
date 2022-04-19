import { Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { VoidFunctionComponent } from 'react';
import { z } from 'zod';

interface TweetComposerProps {}

const schema = z.object({
  text: z
    .string()
    .max(240, { message: 'Tweets cannot be longer than 240 characters' })
    .min(1, { message: 'Tweets must have text' }),
});
export type TweetComposerValues = z.infer<typeof schema>;

const TweetComposer: VoidFunctionComponent<TweetComposerProps> = () => {
  const form = useForm<TweetComposerValues>({
    schema: zodResolver(schema),
    initialValues: {
      text: '',
    },
  });

  return <Box></Box>;
};

export default TweetComposer;
