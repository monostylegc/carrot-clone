import withHandler from '@libs/server/withhandler';
import client from '@libs/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { name, price, description } = req.body;
    const session = await getSession({ req });
    console.log(session?.user?.email)
    res.json({ ok: true, message: 'hello' })
}

export default withHandler({
    methods: ['GET', 'POST'],
    handler
})