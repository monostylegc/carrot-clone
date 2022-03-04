import withHandler from '@libs/server/withhandler';
import client from '@libs/client';
import { NextApiRequest, NextApiResponse } from 'next';
//import { getSession } from 'next-auth/react';

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const post = await client.post.findUnique({
            where: {
                id: +id.toString()
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        res.json({
            ok: true,
            post
        })
    }
}

export default withHandler({
    methods: ['GET'],
    handler
})