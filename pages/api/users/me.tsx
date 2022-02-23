import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client";
import withHandler, { ResponseType } from "@libs/server/withhandler";
import { getSession } from "next-auth/react";

async function handler (req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const session = await getSession({ req })

    console.log(session?.user)

    return res.json({ ok: true, })
}

export default withHandler({ methods: ['GET'], handler })