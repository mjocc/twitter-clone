import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Profile: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <>
      <Head>
        <title>@{username} | Twitter</title>
      </Head>
    </>
  );
};

export default Profile;
