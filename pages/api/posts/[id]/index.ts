import withHandler from '@libs/server/withhandler';
import client from '@libs/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const session = await getSession({ req })

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
            },
            _count: {
                select: {
                    answers: true,
                    wonderings: true,
                }
            },
            answers: {
                select: {
                    answer: true,
                    id: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    }
                }
            }
        },
    })

    const isWondering = Boolean(await client.wondering.findFirst({
        where: {
            postId: +id.toString(),
            userId: session?.userId + ""
        },
        select: {
            id: true
        }
    }))
    res.json({
        ok: true,
        post,
        isWondering
    })
}

export default withHandler({
    methods: ['GET'],
    handler
})