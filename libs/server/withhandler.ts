import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export interface ResponseType {
    ok: boolean;
    [key: string]: any;
}

interface ConfigType {
    method: "GET" | "POST" | "DELETE",
    handler: (req: NextApiRequest,
        res: NextApiResponse) => void,
    isPrivate?: boolean
}

export default async function withHandler (
    { method,
        isPrivate = true,
        handler }: ConfigType) {
    return async function (req: NextApiRequest, res: NextApiResponse): Promise<any> {
        const session = await getSession({ req })

        if (req.method !== method) {
            return res.status(405).end();
        }
        if (isPrivate && !session) {
            return res.status(401).json({ ok: false, error: "Login first, plz." });
        }
        try {
            await handler(req, res)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }
}