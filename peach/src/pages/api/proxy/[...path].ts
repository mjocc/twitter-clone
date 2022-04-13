import Cookies from 'cookies';
import { IncomingMessage } from 'http';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const API_URL = process.env.API_BASE_URL;
const proxy = httpProxy.createProxyServer();

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = (req, res) => {
  return new Promise<void>((resolve, reject) => {
    const interceptLoginResponse = (
      proxyRes: IncomingMessage,
      req: NextApiRequest,
      res: NextApiResponse
    ) => {
      let apiResponseBody = '';
      proxyRes.on('data', (chunk) => {
        apiResponseBody += chunk;
      });
      proxyRes.on('end', () => {
        try {
          const responseData = JSON.parse(apiResponseBody);
          if (responseData?.token) {
            const cookies = new Cookies(req, res);
            //TODO: swap to JWT? check django rest framework and what JWTs are better at
            cookies.set('auth-token', JSON.stringify(responseData), {
              httpOnly: true,
              sameSite: 'lax',
            });
            delete responseData.token;
            res.status(200).json({ ...responseData, loggedIn: true });
            resolve();
          } else {
            res.status(proxyRes.statusCode ?? 500).json(responseData);
          }
        } catch (err) {
          reject(err);
        }
      });
    };

    const pathname = req.url as string;
    const isLogin = pathname === '/api/proxy/obtain-auth-token?';
    const cookies = new Cookies(req, res);
    const authInfo = cookies.get('auth-token');
    req.url = pathname.replace(/^\/api\/proxy/, '');
    req.headers.cookie = '';
    if (authInfo) {
      const authToken = JSON.parse(authInfo)?.token;
      req.headers['Authorization'] = `Token ${authToken}`;
    }
    if (isLogin) {
      proxy.once('proxyRes', interceptLoginResponse as ProxyResCallback);
    }
    proxy.once('error', reject);

    proxy.web(req, res, {
      target: API_URL,
      autoRewrite: false,
      selfHandleResponse: isLogin,
    });
  });
};

export default handler;
