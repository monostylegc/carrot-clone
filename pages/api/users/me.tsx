import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client";
import withHandler, { ResponseType } from "@libs/server/withhandler";
import { getSession } from "next-auth/react";

async function handler (req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const session = await getSession({ req })

    if(!session)
    {
        return res.json({ ok: true, session : session})
    }
    else return res.json({ok: false, message: session})
    
}

export default withHandler({ methods: ['GET'], handler })