import withHandler from '@libs/server/withhandler';
import client from '@libs/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const session = await getSession({ req })

    const alreadyExist = await client.wondering.findFirst({
        where: {
            userId: session?.userId + "",
            postId: +id.toString()
        }
    })

    if (alreadyExist) {
        await client.wondering.delete({
            where: {
                id: alreadyExist.id
            },
            select: {
                id: true
            }
        })
    } else {
        await client.wondering.create({
            data: {
                user: {
                    connect: {
                        id: session?.userId + ""
                    }
                },
                post: {
                    connect: {
                        id: +id.toString()
                    }
                }
            }
        })
    }

    res.json({
        ok: true,
    })
}

export default withHandler({
    methods: ['POST'],
    handler
})