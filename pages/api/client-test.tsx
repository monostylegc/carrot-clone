import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    await client.user.create({
        data: {
            email: 'monostylegc@naver.com',
            name: 'sukbong'
        }
    })

    res.json({
        ok: true,
    })
}