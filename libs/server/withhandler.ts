import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function withHandler (
    method: "GET" | "POST" | "DELETE",
    fn: (req: NextApiRequest,
        res: NextApiResponse) => void,
    isPrivate: boolean) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        const session = await getSession({ req })

        if (req.method !== method) {
            return res.status(405).end();
        }
        if (isPrivate && !session) {
            return res.status(401).end();
        }
        try {
            fn(req, res)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }
}