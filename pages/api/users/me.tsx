import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/client";
import withHandler, {ResponseType} from "@libs/server/withhandler";

function handler (req: NextApiRequest,res: NextApiResponse<ResponseType>) {
    
}

export default withHandler({methods:['GET'], handler})