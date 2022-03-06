import withHandler from '@libs/server/withhandler';
import client from '@libs/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { question } = req.body;
    const session = await getSession({ req });
    const userId = session?.userId

    if (req.method === 'POST') {
        const post = await client.post.create({
            data: {
                question,
                user: {
                    connect: {
                        id: userId + ""
                    }
                }
            }
        })
        res.json({
            ok: true,
            post
        })
    }
    if (req.method === 'GET') {
        const posts = await client.post.findMany({
            include: {
                _count: {
                    select: {
                        wonderings: true,
                        answers: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return res.json({
            ok: true,
            posts
        })
    }

}

export default withHandler({
    methods: ['POST', 'GET'],
    handler
})