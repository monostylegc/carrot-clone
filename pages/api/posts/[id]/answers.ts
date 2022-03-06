import withHandler from '@libs/server/withhandler';
import client from '@libs/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const session = await getSession({ req })
    const { answer } = req.body
    
    //post가 존재하는지 아직 체크 안했다 넣어야한다.

    const answers = await client.answer.create({
        data:{
            answer,
            user:{
                connect:{
                    id: session?.userId+""
                }
            },
            post:{
                connect:{
                    id: +id.toString()
                }
            }
        }
    })

    res.json({
        ok: true,
        answer: answers
    })
}

export default withHandler({
    methods: ['POST'],
    handler
})