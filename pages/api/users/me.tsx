import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client";
import withHandler from "@libs/server/withhandler";

async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body);
    res.json({ ok: true, message: 'GooD~' })
}

export default () => {
    withHandler({
        method: "GET",
        handler
    })
};