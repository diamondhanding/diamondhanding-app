import connectSolana, {
	NextApiRequestWithSolanaProgram,
} from "@/server/middleware/connectSolana";
import { DebugInfo, sendErrorToDiscord } from "@/utils/sendErrorToDiscord";
import {
	Keypair,
	Transaction,
	SystemProgram,
	PublicKey,
} from "@solana/web3.js";
import { NextApiResponse } from "next";

export type TxCreateData = {
	tx: string;
};

export default connectSolana(
	async (
		req: NextApiRequestWithSolanaProgram,
		res: NextApiResponse<TxCreateData>
	) => {
		if (req.method === "POST") {
			const { walletAddress } = req.body;

			if (!req.solanaConnection) {
				return res.status(500).json({ tx: "" });
			}

			const connection = req.solanaConnection;

			try {
				let transaction: Transaction = new Transaction();
				transaction.add(
					SystemProgram.transfer({
						fromPubkey: new PublicKey(walletAddress),
						toPubkey: new PublicKey(walletAddress),
						lamports: 0, // replace with actual prize amount
					})
				);

				const blockHash = (await connection.getLatestBlockhash("finalized"))
					.blockhash;
				transaction.feePayer = new PublicKey(walletAddress);
				transaction.recentBlockhash = blockHash;

				const ids = [];

				const serializedTransaction = transaction.serialize({
					requireAllSignatures: false, // only partially signed
					verifySignatures: true,
				});
				const transactionBase64 = serializedTransaction.toString("base64");

				return res.status(200).json({
					tx: transactionBase64,
				});
			} catch (error: any) {
				const info: DebugInfo = {
					errorType: "Transaction Create Error",
					message: (error as Error).message,
					route: "api/transaction/create.ts",
					data: {
						walletAddress,
					},
				};
				sendErrorToDiscord(info);
				return res.status(500).json({ tx: "" });
			}
		} else {
			res.status(405).json({ tx: "" });
		}
	}
);
