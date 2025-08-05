// pages/api/twitter/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  clientId: 'NEVOM3hRNmRiaU5Cb3BnRm9aWG86MTpjaQ'!,
  clientSecret: 'ntfxSJvFstZF4B_YnJDn85M9dfLq3eDsXR7f6587JkAYUTtkR0'!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, verifier } = req.body;
  if (!verifier || typeof code !== 'string')
    return res.status(400).json({ error: 'Missing verifier or code' });

  try {
    const {
      client: loggedClient,
      accessToken,
      refreshToken,
      expiresIn,
    } = await client.loginWithOAuth2({
      code,
      codeVerifier: verifier as string,
      redirectUri: `https://www.niceape.app/twitter-handler`,
    });

    const user = await loggedClient.v2.me({
      'user.fields': ['profile_image_url'],
    });
    return res.status(200).json({ user, accessToken });
  } catch (err: any) {
    console.log(err?.data);
    return res.status(500).json({ error: (err as Error).message });
  }
}
