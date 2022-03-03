import withHandler from '@libs/server/withhandler';
import client from '@libs/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    const session = await getSession({ req })
    const product = await client.product.findUnique({
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
        },
    })
    //공백부분을 기준으로 String을 배열로 만든다.
    const terms = product?.name.split(" ").map(word => ({
        name: {
            contains: word,
        }
    }))

    const relatedProducts = await client.product.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: product?.id
                }
            }
        }
    })

    const isLiked = Boolean(await client.fav.findFirst({
        where: {
            productId: product?.id,
            userId: session?.userId + ""
        },
        select: {
            id: true
        }
    }))

    res.json({
        ok: true,
        product,
        relatedProducts,
        isLiked
    })
}

export default withHandler({
    methods: ['GET'],
    handler
})