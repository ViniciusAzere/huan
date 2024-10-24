import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') res.status(400).json({ message: 'Invalid method' });

  try {
    const url = process.env.DISCORD_WEBHOOK;

    if (!url) return res.status(400).json({ message: 'Missing DISCORD_WEBHOOK env' });

    const { date } = req.body;

    if (!date) return res.status(400).json({ message: 'Missing "date"' });

    await axios.post(url, { content: date });

    res.status(200).json({ message: 'OK!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
