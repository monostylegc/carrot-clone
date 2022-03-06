import withHandler from '@libs/server/withhandler';
import client from '@libs/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    const session = await getSession({ req })

    //product가 존재하는지 체크해야함. 안했다. 나중에 하자.

    const alreadyExist = await client.fav.findFirst({
        where: {
            productId: +id.toString(),
            userId: session?.userId + ""
        }
    })
    if (alreadyExist) {
        //delete
        await client.fav.delete({
            where: {
                id: alreadyExist.id
            }
        })
    }
    else {
        //create
        await client.fav.create({
            data: {
                user: {
                    connect: {
                        id: session?.userId + ""
                    }
                },
                product: {
                    connect: {
                        id: +id.toString()
                    }
                }
            }
        })
    }
    res.json({ ok: true })
}

export default withHandler({
    methods: ['POST'],
    handler
})