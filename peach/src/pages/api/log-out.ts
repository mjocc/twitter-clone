import Cookies from 'cookies';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set('auth-token');
  res.status(200).json({ loggedIn: false });
};

export default handler;
