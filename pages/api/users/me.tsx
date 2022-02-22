import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client";
import withHandler, {ResponseType} from "@libs/server/withhandler";

function handler (req: NextApiRequest,res: NextApiResponse<ResponseType>) {
    console.log(req.body);
    return res.json({ ok: true, message : 'GooD~' })
}

export default withHandler({methods:['GET'], handler})