import {
  Affix,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { VoidFunctionComponent } from 'react';

interface ProfileBannerProps {
  profileName: string;
  numTweets: number;
}

const ProfileBanner: VoidFunctionComponent<ProfileBannerProps> = ({
  profileName,
  numTweets,
}) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <Paper py={10} px={20} sx={{ position: 'sticky', top: 60, zIndex: 100 }}>
      <Group position="apart">
        <Stack>
          <Text size="lg" weight={700} mb={-20}>
            {profileName}
          </Text>
          <Text color="dimmed">{formatter.format(numTweets)} tweets</Text>
        </Stack>
        {/* //TODO: implement this */}
        <Button>Follow</Button>
      </Group>
    </Paper>  
  );
};

export default ProfileBanner;
