import withHandler from '@libs/server/withhandler';
import client from '@libs/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { name, price, description } = req.body;
    const session = await getSession({ req });
    const userId = session?.userId

    if (req.method === 'POST') {
        const product = await client.product.create({
            data: {
                name,
                price: +price,
                description,
                image: 'xx',
                user: {
                    connect: {
                        id: userId + ""
                    }
                }
            }
        })
        res.json({
            ok: true,
            product
        })
    }
    if (req.method === 'GET') {
        const products = await client.product.findMany({})
        console.log(products)
        return res.json({
            ok: true,
            products
        })
    }

}

export default withHandler({
    methods: ['POST', 'GET'],
    handler
})